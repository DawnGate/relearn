import { db } from '@/helpers'

import { Product, IProduct, Category } from '@/models'
import { FilterQuery, SortOrder } from 'mongoose'

const getAll = async (
	{ page = 1, page_size = 10 }: { page: number; page_size: number },
	filter: FilterQuery<IProduct> = {},
	sort: {
		[key: string]: SortOrder
	} = {},
) => {
	await db.connectDB()
	const products = await Product.find(filter)
		.select('title price images inStock sold discount')
		.skip((page - 1) * page_size)
		.limit(page_size)
		.sort(sort)

	const productsLength = await Product.countDocuments(filter)

	const pricesList = await Product.find(
		{
			category: filter.category,
		},
		{
			inSocket: { $gte: 1 },
		},
	).distinct('price')
	const mainMaxPrice = Math.max(...pricesList)
	const mainMinPrice = Math.min(...pricesList)

	// TODO: Bug, max price and min price not return correct

	return {
		mainMaxPrice,
		mainMinPrice,
		products,
		productsLength,
		pagination: {
			currentPage: page,
			nextPage: page + 1,
			previousPage: page - 1,
			hasNextPage: page_size * page < productsLength,
			hastPreviousPage: page > 1,
			lastPage: Math.ceil(productsLength / page_size),
		},
	}
}

const getById = async (id: string) => {
	await db.connectDB()

	const result = await Product.findById(id)
	if (!result) {
		const newError = new Error('Product not found')
		newError.name = 'ErrProductNotFound'
		throw newError
	}

	return result
}

const create = async (params: IProduct) => {
	await db.connectDB()

	const newProduct = new Product(params)

	const rootCategory = await Category.findOne({
		parent: undefined,
	})

	if (rootCategory) {
		newProduct.category?.unshift(rootCategory?._id)
	}

	await newProduct.save()
}

export const productRepo = {
	getAll,
	getById,
	create,
}
