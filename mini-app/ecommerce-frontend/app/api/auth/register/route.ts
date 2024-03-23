import joi from 'joi'
import { NextRequest } from 'next/server'

import { apiHandler, setJson } from '@/helpers/api'
import { usersRepo } from '@/helpers'

const register = apiHandler(
	async (req: NextRequest) => {
		const body = await req.json()
		console.log(body)
		const result = await usersRepo.create(body)
		console.log(result, 'result')
		return setJson({
			data: result,
		})
	},
	{
		schema: joi.object({
			name: joi.string().min(3).required(),
			email: joi.string().required(),
			password: joi.string().min(6).required(),
		}),
	},
)

export const POST = register
