import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { errorHandler, jwtMiddleware, setJson } from '.'
import { identityMiddleware } from './identify-middleware'
import { validateMiddleware } from './validate-middleware'

export const isPublicPath = (req: NextRequest) => {
	const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
	return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

export const apiHandler = (
	handler: (req: NextRequest) => Promise<ReturnType<typeof setJson>>,
	{
		identity = 'user',
		schema,
		isJwt = false,
	}: {
		identity?: string
		schema?: Joi.Schema
		isJwt?: boolean
	},
) => {
	return async (req: NextRequest) => {
		try {
			if (!isPublicPath(req) && isJwt) {
				// global middleware
				jwtMiddleware(req, isJwt)
				await identityMiddleware(req, identity, isJwt)
			}

			await validateMiddleware(req, schema)

			// router handler
			const responseBody = await handler(req)
			console.log(responseBody, 'body response')
			return NextResponse.json(responseBody || {})
		} catch (err) {
			console.log('global error handler', (err as Error).name)
			return errorHandler(err as Error)
		}
	}
}
