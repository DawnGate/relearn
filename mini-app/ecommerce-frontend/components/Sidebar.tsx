'use client'
import Link from 'next/link'

import { useEffect } from 'react'
import { useDisclosure } from '@/hooks'

import { Icons, LogoH, SidebarSkeleton } from '@/components'

import { useGetCategoriesQuery } from '@/store/services'
import { Disclosure } from '@headlessui/react'

export const Sidebar = () => {
	const { categoriesList, isLoading } = useGetCategoriesQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({
			categoriesList: data?.data.categoriesList,
			isLoading,
		}),
	})

	const [isSidebar, sidebarHandlers] = useDisclosure()

	const handleClose = () => {
		sidebarHandlers.close()
	}

	useEffect(() => {
		if (isSidebar) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isSidebar])

	let sideBarContent = null

	if (isLoading) {
		sideBarContent = <SidebarSkeleton />
	} else if (categoriesList) {
		sideBarContent = (
			<div>
				{categoriesList.child?.map(cat => (
					<Disclosure key={cat._id}>
						{({ open }) => (
							<>
								<Disclosure.Button className='!mt-0 flex w-full items-center justify-between px-4 py-2'>
									<span
										className={`pl-3 font-semibold tracking-wide ${open ? 'text-red-400' : 'text-gray-600'}`}
									>
										{cat.name}
									</span>

									<Icons.ArrowDownLine
										className={`h-7 w-7 rounded-2xl bg-gray-50 ${open ? 'rotate-180 transform text-red-400' : 'text-gray-700'}`}
									/>
								</Disclosure.Button>

								<Disclosure.Panel className='!mt-0 bg-gray-100 text-sm  text-gray-500'>
									<Link
										href={`/main/${cat.slug}`}
										className='inline-flex max-w-max items-center py-2 pl-7 text-sm text-gray-500'
										onClick={handleClose}
									>
										All categories in this category
										<Icons.ArrowRight2 className='icon text-gray-500' />
									</Link>
									{cat.child?.map(childCat => (
										<Disclosure key={childCat._id}>
											{({ open }) => (
												<>
													<Disclosure.Button className='!mt-0 flex w-full items-center justify-between px-4 py-2 pl-7'>
														<span
															className={`pl-3 font-semibold tracking-wide ${open ? 'text-red-400' : 'text-gray-600'}`}
														>
															{childCat.name}
														</span>

														<Icons.ArrowDownLine
															className={`h-7 w-7 rounded-2xl bg-gray-50 ${open ? 'rotate-180 transform text-red-400' : 'text-gray-700'}`}
														/>
													</Disclosure.Button>

													<Disclosure.Panel className='!mt-0 bg-gray-100 text-sm  text-gray-500'>
														<Link
															href={`/products?category=${childCat.slug}`}
															className='inline-flex max-w-max items-center py-2 pl-7 text-sm text-gray-500'
															onClick={handleClose}
														>
															All categories in this category
															<Icons.ArrowRight2 className='icon text-gray-500' />
														</Link>
														{childCat.child?.map(grandCat => (
															<Link
																href={`/product?category=${grandCat.slug}`}
																key={grandCat._id}
																className='my-2 block py-2.5 pl-9 font-normal tracking-wide'
																onClick={handleClose}
															>
																{grandCat.name}
															</Link>
														))}
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				))}
			</div>
		)
	}

	return (
		<>
			<button className='p-1 lg:hidden' type='button' onClick={sidebarHandlers.open}>
				<Icons.Bars className='icon' />
			</button>
			<div
				className={`fixed top-0 z-10 h-screen w-full duration-200 lg:hidden ${isSidebar ? 'right-0' : '-right-full'}`}
			>
				<div
					className={`${isSidebar ? 'visible opacity-100 delay-200 duration-300' : 'invisible opacity-0'} z-10 h-full w-full bg-gray-100/50`}
					onClick={handleClose}
				></div>
				<div className='absolute right-0 top-0 z-20 h-screen w-3/4 max-w-sm space-y-4 overflow-y-auto bg-white py-4'>
					<LogoH className='ml-3 h-10 w-28' />
					<h5 className='border-t-2 border-gray-200 p-3'>Categories</h5>
					{sideBarContent}
				</div>
			</div>
		</>
	)
}
