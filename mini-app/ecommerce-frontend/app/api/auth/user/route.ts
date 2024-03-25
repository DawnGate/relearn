import { NextRequest } from 'next/server'

import { apiHandler, setJson } from '@/helpers/api'
import { usersRepo } from '@/helpers'

const getUserInfo = apiHandler(
	async (req: NextRequest) => {
		const userId = req.headers.get('userId') as string
		const result = await usersRepo.getById(userId)
		return setJson({
			data: {
				name: result.name,
				email: result.email,
				mobile: result.mobile,
				address: result.address,
				root: result.root,
				role: result.role,
			},
		})
	},
	{
		isJwt: true,
	},
)

export const GET = getUserInfo
