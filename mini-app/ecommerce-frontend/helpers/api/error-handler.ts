import { NextResponse } from 'next/server'
import { setJson } from '@/helpers/api'

export const errorHandler = (err: Error | string) => {
	if (typeof err === 'string') {
		const is404 = err.toLowerCase().endsWith('not found')

		const status = is404 ? 404 : 400

		return NextResponse.json(
			setJson({
				message: err,
				code: status,
			}),
			{
				status,
			},
		)
	}

	return NextResponse.json(
		setJson({
			message: 'Server error',
			code: 500,
		}),
		{
			status: 500,
		},
	)
}
