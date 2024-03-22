import { NextRequest } from 'next/server'
import { auth } from '../auth'

export const jwtMiddleware = (req: NextRequest, isJwt = false) => {
	const id = auth.verifyToken(req, isJwt)

	if (!id) {
		throw new Error('Not found jwt id')
	}

	req.headers.set('userId', id)
}
