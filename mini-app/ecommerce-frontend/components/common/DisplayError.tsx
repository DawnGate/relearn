'use client'

import { Transition } from '@headlessui/react'
import { Icons } from '@/components'

import { FieldError } from 'react-hook-form'

interface Props {
	errors?: FieldError
}

export const DisplayError = ({ errors }: Props) => {
	return (
		<div>
			<Transition
				show={!!errors}
				enter='transition-opacity duration-150'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-10'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
			>
				<div className='mt-1.5 inline-flex min-h-[20px] min-w-max gap-x-1 text-sm'>
					<Icons.Exclamation className='text-red-600' />
					<span className='text-red-600'>{errors?.message}</span>
				</div>
			</Transition>
		</div>
	)
}
