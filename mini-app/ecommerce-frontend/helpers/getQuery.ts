import { NextRequest } from 'next/server'

export const getQuery = (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams
	const query: {
		[key: string]: string
	} = {}
	searchParams.forEach((value, key) => {
		query[key] = value
	})
	return query
}
