'use client'

import { useEffect, useState } from 'react'
import { Icons, NavbarSkeleton, ResponsiveImage } from '@/components'
import { useGetCategoriesQuery } from '@/store/services'
import Link from 'next/link'
import { CategoryWithChild } from '@/types'

export const Navbar = () => {
	const { categories, isLoading } = useGetCategoriesQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({
			isLoading,
			categories: data?.data.categories,
		}),
	})

	const [isHover, setIsHover] = useState(false)

	const [activeMinCat, setActiveMinCat] = useState<CategoryWithChild>()

	const handleActive = (cat: CategoryWithChild) => {
		setActiveMinCat(cat)
	}

	const handleDeactivate = () => {
		if (categories) {
			setActiveMinCat(categories.filter(categories => categories.level === 1)[0])
		}
	}

	useEffect(() => {
		handleDeactivate()
	}, [categories])

	let navbarContent = null
	let navbarMinContent = null

	if (isLoading) {
		navbarContent = <NavbarSkeleton />
	} else if (categories) {
		navbarContent = categories
			.filter(cat => cat.level === 1)
			.map(levelOneCat => (
				<li
					key={levelOneCat._id}
					className='group w-full px-2 py-0.5 text-sm hover:bg-gray-100'
					onMouseOver={() => handleActive(levelOneCat)}
				>
					<Link href={`/main/${levelOneCat.slug}`} className='flex items-center gap-x-1.5 p-3'>
						<ResponsiveImage
							dimensions='w-7 h-7'
							className='grayscale'
							src={levelOneCat.image}
							alt={levelOneCat.name}
						/>
						<span>{levelOneCat.name}</span>
					</Link>
				</li>
			))

		if (activeMinCat) {
			navbarMinContent = categories
				.filter(cat => cat._id === activeMinCat._id)
				.map(levelTwoCat => (
					<li key={levelTwoCat._id} className='h-fit'>
						<Link
							className='flex-center mb-1 border-l-2 border-red-500 px-2 text-sm font-semibold tracking-wider text-gray-700'
							href={`/products?category=${levelTwoCat.slug}`}
						>
							{levelTwoCat.name}
							<Icons.ArrowRight2 className='icon' />
						</Link>
						<ul className='space-y-1'>
							{categories
								.filter(cat => cat.parent === levelTwoCat._id)
								.map(levelThreeCat => (
									<li key={levelThreeCat._id}>
										<Link
											href={`/products?category=${levelThreeCat.slug}`}
											className='px-3 text-xs font-medium text-gray-700'
										>
											{levelThreeCat.name}
										</Link>
									</li>
								))}
						</ul>
					</li>
				))
		}
	}

	return (
		<div className='group hidden lg:block'>
			<button
				className='flex-center gap-x-1 px-2 text-sm'
				type='button'
				onMouseLeave={() => setIsHover(false)}
				onMouseOver={() => setIsHover(true)}
			>
				<Icons.Bars className='icon' />
				Categories
			</button>
			<div
				className={`fixed left-0 top-28 z-10 h-screen w-full bg-gray-400/50 ${isHover ? 'block' : 'hidden'}`}
			></div>
			<div
				className='absolute top-8 z-40 hidden w-full rounded-md border border-gray-100 bg-white shadow-lg group-hover:block'
				onMouseOver={() => {
					setIsHover(true)
				}}
				onMouseLeave={() => {
					setIsHover(false)
					handleDeactivate()
				}}
			>
				<div className='flex'>
					<ul className='w-72 border-l-2 border-gray-100'>{navbarContent}</ul>
					<ul className='flex w-full flex-wrap gap-10 px-2 py-4'>{navbarMinContent}</ul>
				</div>
			</div>
		</div>
	)
}
