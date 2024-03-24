'use client'

import { Button } from '@/components'
import { useEffect } from 'react'

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
	const handleInformUs = () => {
		console.log('Inform the error', error)
	}

	const handleReset = () => {
		reset()
	}

	useEffect(() => {
		console.error(error)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className='container lg:px-3 xl:mt-32'>
			<div className='mx-auto w-fit space-y-3 py-20 text-center'>
				<h5 className='text-xl'>{error.name}</h5>
				<p className='text-lg text-red-500'>
					An exception occurred, please check whether your address is correct or contact the
					administrator
				</p>
				<Button className='mx-auto' onClick={handleInformUs}>
					Inform us
				</Button>
				<Button className='mx-auto hidden' onClick={handleReset}>
					Reset
				</Button>
			</div>
		</main>
	)
}

export default ErrorPage
