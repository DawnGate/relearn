import Link from 'next/link'
import { ReactNode } from 'react'

import { Icons } from '@/components'

interface Props {
	path: string
	children: ReactNode
}

export const ArrowLink = ({ path, children }: Props) => {
	return (
		<Link href={path} className='inline-flex max-w-max items-center text-sm text-blue-400'>
			<span className='text-sky-500'>{children}</span>
			<Icons.ArrowRight2 className='icon text-sky-500' />
		</Link>
	)
}
