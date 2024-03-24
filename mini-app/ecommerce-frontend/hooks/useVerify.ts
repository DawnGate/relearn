import { useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'

import { selectUserToken } from '@/store/slices'

export const useVerify = () => {
	let status: boolean = false
	const token = useSelector(selectUserToken)

	if (!token) return status

	jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, (err, decoded) => {
		if (err) status = false
		if (decoded) status = true
	})

	return status
}
