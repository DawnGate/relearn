'use client'

import { useEffect } from 'react'

import { showAlert } from '@/store/slices'
import { useAppDispatch } from '@/store/hooks'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/react'
import { ResponseImpl } from '@/types'

interface Props {
	isSuccess: boolean
	isError: boolean
	error: FetchBaseQueryError | SerializedError | undefined
	message: string
	onSuccess?: () => void
	onError?: () => void
}

export const HandleResponse = ({
	isSuccess,
	isError,
	error,
	message,
	onSuccess,
	onError,
}: Props) => {
	const appDispatch = useAppDispatch()

	useEffect(() => {
		let errMsg = 'Unknown error'

		if (error) {
			if ('data' in error) {
				const data = error.data as ResponseImpl<string>
				errMsg = data.message
			} else if ('status' in error) {
				errMsg = JSON.stringify(error.status)
			}
		}

		if (isSuccess) {
			if (onSuccess) onSuccess()
			appDispatch(
				showAlert({
					title: message,
					status: 'success',
				}),
			)
		}

		console.log(isError, error)
		if (isError) {
			if (onError) onError()
			appDispatch(
				showAlert({
					title: errMsg,
					status: 'error',
				}),
			)
		}
		// it only render and action 1 time, so don't need to capture what will action
	}, [isSuccess, isError])

	return null
}
