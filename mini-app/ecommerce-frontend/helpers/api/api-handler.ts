import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { errorHandler, setJson } from '.'

export const isPublicPath = (req: NextRequest) => {
	const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
	return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

export const apiHandler = (
	handler: (req: NextRequest) => Promise<ReturnType<typeof setJson>>,
	{
		identity,
		schema,
		isJwt,
	}: {
		identity?: any
		schema?: Joi.Schema
		isJwt?: boolean
	},
) => {
	return async (req: NextRequest) => {
		try {
			if (!isPublicPath(req)) {
				// global middleware
				console.log('call middle ware')
			}

			console.log(identity, schema, isJwt)

			// router handler
			const responseBody = await handler(req)
			console.log(responseBody, 'body response')
			return NextResponse.json(responseBody || {})
		} catch (err) {
			console.log('global error handler', err)
			return errorHandler(err as Error)
		}
	}
}
