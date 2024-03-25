'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Icons, Person } from '@/components'

interface Props {
	name: string
}

export const UserDropdown = ({ name }: Props) => {
	return (
		<Menu as='div' className='dropdown'>
			<Menu.Button className='dropdown__button'>
				<Icons.User className='icon' />
				<Icons.ArrowDown className='icon' />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='w-65 dropdown__items'>
					<Menu.Item>
						<div className='transition-colors hover:bg-gray-100'>
							<Link
								href='/profile'
								className='text-gray-70- flex-center flex items-center justify-between gap-x-1 px-7 py-4 text-xs font-medium md:text-sm'
							>
								<Person className='h-6 w-6' />
								<span className='ml-3 flex-auto text-gray-700'>{name}</span>
								<Icons.ArrowRight2 className='icon text-gray-700' />
							</Link>
						</div>
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
