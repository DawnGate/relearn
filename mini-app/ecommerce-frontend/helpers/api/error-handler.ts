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

	if (err.name === 'JsonWebTokenError') {
		return NextResponse.json(
			setJson({
				message: 'Unauthorized',
				code: 401,
			}),
			{
				status: 401,
			},
		)
	}

	if (err.name === 'UserExistsError') {
		return NextResponse.json(
			setJson({
				message: err.message,
				code: 422,
			}),
			{
				status: 422,
			},
		)
	}

	if (err.name !== 'Error') {
		return NextResponse.json(
			setJson({
				message: err.message,
				code: 400,
			}),
			{ status: 400 },
		)
	}

	return NextResponse.json(
		setJson({
			message: err.message,
			code: 500,
		}),
		{
			status: 500,
		},
	)
}
