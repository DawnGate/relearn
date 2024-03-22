import { apiHandler, setJson } from '@/helpers/api'
import { NextRequest } from 'next/server'
// import { usersRepo } from '@/helpers/db-repo'
// import joi from 'joi'

const login = apiHandler(async (req: NextRequest) => {
	const body = await req.json()
	console.log(body)
	const result = {
		token: 'hello',
	}
	return setJson({
		data: result,
		message: 'Login successful',
	})
})

export const POST = login

// TODO force-dynamic
