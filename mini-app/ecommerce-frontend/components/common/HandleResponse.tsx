'use client'

import { useEffect } from 'react'

import { showAlert } from '@/store/slices'
import { useAppDispatch } from '@/store/hooks'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/react'

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

	let errMsg: string

	if (error) {
		// TODO: type for error
		if ('status' in error) {
			errMsg = JSON.stringify(error.status)
		} else {
			errMsg = 'error'
		}
	}

	useEffect(() => {
		if (isSuccess) {
			if (onSuccess) onSuccess()
			appDispatch(
				showAlert({
					title: message,
					status: 'success',
				}),
			)
		}

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
