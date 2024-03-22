import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const verifyToken = (req: NextRequest, isJwt: boolean) => {
	try {
		const token = req.headers.get('authorization')

		if (!token) {
			throw new Error('Authorization must in header')
		}
		console.log(token)
		const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!)
		if (typeof decoded !== 'string') {
			const id = decoded.id as string
			return id
		}

		throw new Error('Forbidden')
	} catch (err) {
		if (isJwt) {
			throw err
		}
	}
}

const createAccessToken = (payload: string) => {
	return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, {
		expiresIn: '1d',
	})
}

export const auth = {
	verifyToken,
	createAccessToken,
}
