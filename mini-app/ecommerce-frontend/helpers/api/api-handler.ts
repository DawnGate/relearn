import { NextRequest } from 'next/server'

export const isPublicPath = (req: NextRequest) => {
	const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
	return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}

export const apiHandler = () => {
	return
}
