'use client'

import { removeAlert, selectAlert } from '@/store/slices'
import { useAppDispatch } from '@/store/hooks'
import Image from 'next/image'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Alert = () => {
	const appDispatch = useAppDispatch()

	const { isShow, title, status } = useSelector(selectAlert)

	let IconSrc

	switch (status) {
		case 'success':
			IconSrc = '/icons/success.svg'
			break
		case 'error':
			IconSrc = '/icons/error.svg'
			break
		case 'exclamation':
			IconSrc = '/icons/exclamation.svg'
			break
		case 'question':
			IconSrc = '/icons/question.svg'
			break
		default:
			IconSrc = '/icons/nothing.svg'
			break
	}

	const handleClickOverlay = () => {
		appDispatch(removeAlert())
	}

	console.log(isShow)

	useEffect(() => {
		if (isShow) {
			const timeout = setTimeout(() => {
				appDispatch(removeAlert())
			}, 2000)
			return () => clearTimeout(timeout)
		}
	}, [isShow])

	const containerClassName = `${isShow ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-500 fixed inset-0 z-40`
	const boxClassName = `${isShow ? 'top-40' : '-top-full'} max-w-md fixed transition-all duration-700 left-0 right-0 mx-auto z-40`

	return (
		<div className={containerClassName}>
			<div className='h-full w-full bg-gray-400/20' onClick={handleClickOverlay}></div>
			<div className={boxClassName}>
				<div className='mx-2 h-fit rounded-md bg-white p-3 text-center shadow'>
					<Image alt={status} src={IconSrc} width={80} height={80} className='mx-auto' />
					<p className='mt-2'>{title}</p>
				</div>
			</div>
		</div>
	)
}
