import { apiHandler, setJson } from '@/helpers/api'
import { NextRequest } from 'next/server'

import { usersRepo } from '@/helpers/db-repo'
import Joi from 'joi'

const login = apiHandler(
	async (req: NextRequest) => {
		const body = await req.json()
		const result = await usersRepo.authenticate(body)
		return setJson({
			data: result,
			message: 'Login successful',
		})
	},
	{
		schema: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().min(6).required(),
		}),
	},
)

export const POST = login
