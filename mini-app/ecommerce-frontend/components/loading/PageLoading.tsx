'use client'
import { useEffect, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { BigLoading } from '..'

NProgress.configure({
	showSpinner: false,
})
export const PageLoading = () => {
	// hooks
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// state
	const [isLoading, setIsLoading] = useState(false)

	// effect
	useEffect(() => {
		setIsLoading(false)
		NProgress.done()

		return () => {
			setIsLoading(true)
			NProgress.start()
		}
	}, [pathname, searchParams])

	return (
		isLoading && (
			<div className='fixed inset-0 z-40'>
				<div className='grid h-full place-items-center bg-blue-50/30'>
					<BigLoading />
				</div>
			</div>
		)
	)
}
