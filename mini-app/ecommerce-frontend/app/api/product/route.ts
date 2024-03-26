import { db, getQuery, productRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'
import { Category } from '@/models'
import Joi from 'joi'
import { NextRequest } from 'next/server'

const getAllProduct = apiHandler(async (req: NextRequest) => {
	const query = getQuery(req)

	const page = query.page ? Number(query.page) : 1
	const page_size = query.page_size ? Number(query.page_size) : 10
	const sort = query.sort ? Number(query.sort) : 1

	const { category, search, inStock, discount, price } = query

	await db.connectDB()
	const currentCategory = await Category.findOne({ slug: category })

	const searchFilter = search
		? {
				title: {
					$regex: search,
					$option: 'i',
				},
			}
		: {}

	const categoryFilter = currentCategory
		? {
				category: { $in: currentCategory._id.toString() },
			}
		: {}

	const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}
	const discountFilter = discount === 'true' ? { discount: { $gte: 0 } } : {}

	const priceFilter = price
		? {
				price: {
					$gte: Number(price.split('-')[0]),
					$lte: Number(price.split('-')[1]),
				},
			}
		: {}

	let order = {}
	switch (sort) {
		case 3:
			order = { price: 1 }
			break
		case 4:
			order = { price: -1 }
			break
		case 2:
			order = { sold: -1 }
			break
		case 1:
			order = { createdAt: -1 }
			break
		case 5:
			order = { rating: -1 }
			break
		case 6:
			order = { discount: 1 }
			break
		default:
			order = { _id: -1 }
			break
	}

	const result = await productRepo.getAll(
		{
			page,
			page_size,
		},
		{
			...categoryFilter,
			...inStockFilter,
			...discountFilter,
			...priceFilter,
			...searchFilter,
		},
		order,
	)
	return setJson({
		data: result,
	})
}, {})

const createProduct = apiHandler(
	async (req: NextRequest) => {
		const body = await req.json()
		await productRepo.create(body)
		return setJson({
			message: 'Create product success',
		})
	},
	{
		isJwt: true,
		identity: 'admin',
		schema: Joi.object({
			title: Joi.string().required(),
			price: Joi.number().required(),
			category: Joi.array().required(),
			images: Joi.array().required(),
			info: Joi.array().required(),
			specification: Joi.array().required(),
			inStock: Joi.number(),
			description: Joi.string().allow(''),
			sizes: Joi.array(),
			colors: Joi.array(),
			category_levels: Joi.object(),
		}),
	},
)

export const GET = getAllProduct
export const POST = createProduct
