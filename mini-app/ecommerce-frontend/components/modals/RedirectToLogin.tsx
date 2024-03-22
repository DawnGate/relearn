'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button, Modal } from '@/components'

interface Props {
	isShow: boolean
	onClose: () => void
	title: string
	text: string
}

export const RedirectToLogin = ({ isShow, onClose, title, text }: Props) => {
	// hooks
	const { push } = useRouter()
	const pathName = usePathname()

	// handler
	const handleClick = () => {
		push(`/login?redirectTo=${pathName}`)
		onClose()
	}

	// render
	return (
		<Modal isShow={isShow} onClose={onClose} effect='ease-out'>
			<Modal.Content>
				<Modal.Body>
					<div className='space-y-4 bg-white p-3 text-center md:rounded-lg'>
						<Image
							alt='!'
							className='mx-auto'
							height={80}
							width={80}
							src='/icons/exclamation.svg'
						/>
						<p className='text-xl font-bold'>{title}</p>
						<p className='text-red-600'>{text}</p>
						<Button className='mx-auto' onClick={handleClick}>
							Go to login
						</Button>
					</div>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}
