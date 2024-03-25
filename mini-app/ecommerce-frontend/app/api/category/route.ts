import { NextRequest } from 'next/server'

import Joi from 'joi'

import { CategoryWithChild } from '@/types'

import { apiHandler, setJson } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const getCategory = apiHandler(
	async () => {
		const result = await categoryRepo.getAll()

		async function getCategoriesWithChildren() {
			const allCategories = result

			const findChildren = (cat: CategoryWithChild): CategoryWithChild => {
				const allChildren = allCategories.filter(c => c.parent?.toString() === cat._id.toString())

				if (allChildren.length) {
					return {
						...cat,
						child: allChildren.map(child => findChildren(child)),
					}
				}

				return cat
			}

			const noParentCategories = allCategories.filter(c => !c.parent)
			return noParentCategories.map(cat => findChildren(cat))
		}

		const categoriesList = await getCategoriesWithChildren()
		return setJson({
			data: {
				categories: result,
				categoriesList: categoriesList[0],
			},
		})
	},
	{
		isJwt: true,
	},
)

const createCategory = apiHandler(
	async (req: NextRequest) => {
		const body = await req.json()
		await categoryRepo.create(body)
		return setJson({
			message: 'Category create successfully',
		})
	},
	{
		isJwt: true,
		identity: 'admin',
		schema: Joi.object({
			name: Joi.string().required(),
			slug: Joi.string().required(),
			image: Joi.string().required(),
			colors: Joi.object({
				start: Joi.string(),
				end: Joi.string(),
			}),
			level: Joi.number().required(),
			parent: Joi.string(),
		}),
	},
)

export const GET = getCategory

export const POST = createCategory

// ? some time, it make the data cache -> so need force-dynamic if you need it
// export const dynamic = 'force-dynamic'
