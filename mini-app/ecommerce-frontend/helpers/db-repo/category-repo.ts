import { db } from '@/helpers'

import { Category, ICategory } from '@/models'
import { FilterQuery } from 'mongoose'

const getAll = async (filter: FilterQuery<ICategory> = {}) => {
	await db.connectDB()
	const result = await Category.find(filter)
		.sort({
			createdAt: 'desc',
		})
		.lean()

	return result
}

const create = async (params: {
	name: string
	slug: string
	image: string
	level: number
	parent?: string
	color?: {
		start: string
		end: string
	}
}) => {
	await db.connectDB()
	const category = await Category.findOne({ name: params.name }, { slug: params.slug })

	if (category) {
		const error = new Error('The category name or slug already exists')
		error.name = 'ErrorAlreadyExistCategory'
		throw error
	}

	const newCategory = new Category(params)
	await newCategory.save()
}

export const categoryRepo = {
	getAll,
	create,
}
