import { NextRequest, NextResponse } from 'next/server'

export const isPublicPath = (req: NextRequest) => {
	const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
	return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

export const apiHandler = handler => {
	return async (req: NextRequest) => {
		try {
			if (!isPublicPath(req)) {
				// global middleware
				console.log('call middle ware')
			}

			// router handler
			const responseBody = await handler(req)
			return NextResponse.json(responseBody || {})
		} catch (err) {
			console.log('global error handler', err)
			return null
		}
	}
}
