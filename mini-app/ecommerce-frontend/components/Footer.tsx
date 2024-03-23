'use client'

import Link from 'next/link'

import { Icons, Logo, Services } from '@/components'

import { siteTitle } from '@/utils'

export const Footer = () => {
	const handlerBackToTheTop = () => {
		window.scrollTo(0, 0)
	}
	return (
		<footer className='mt-8 border-t border-gray-200 bg-gray-50 pt-4'>
			{/* Logo and scroll to top */}
			<div className='container space-y-4 px-3'>
				<div className='flex justify-between'>
					<div>
						<Logo className='mb-6 h-10 w-32' />
						<div className='flex flex-col gap-y-2 lg:flex-row lg:space-x-5'>
							<span>We are here to answer your questions 24 hours a day, 7 days a week</span>
							<span className='hidden w-[2px] bg-gray-300 lg:block'></span>
							<span>My WeChat: huanghanzhilian</span>
						</div>
					</div>
					<div className='min-w-max'>
						<button
							type='button'
							onClick={handlerBackToTheTop}
							className='flex items-center rounded-md border border-gray-300 px-3 py-1'
						>
							<span className='text-sm'>Back to the top</span>
							<Icons.ArrowUp className='h-7 w-7 text-gray-400' />
						</button>
					</div>
				</div>

				<div className='hidden lg:block'>
					<Services />
				</div>

				<div className='space-y-8 lg:flex lg:items-center lg:justify-between'>
					<div className='flex items-center justify-between'>
						<p className='lg:mr-20'>More contact information!</p>
						<div className='flex space-x-3'>
							<Link target='_blank' href='/'>
								<Icons.Twitter className='h-8 w-8 text-gray-400' />
							</Link>
							<Link target='_blank' href='/'>
								<Icons.Linkedin className='h-8 w-8 text-gray-400' />
							</Link>
							<Link target='_blank' href='/'>
								<Icons.Instagram className='h-8 w-8 text-gray-400' />
							</Link>
							<Link target='_blank' href='/'>
								<Icons.Youtube className='h-8 w-8 text-gray-400' />
							</Link>
						</div>
					</div>
					<div className='max-w-lg flex-1'>
						<form className='flex space-x-3'>
							<input placeholder='Your email' className='input' type='email' />
							<button
								type='submit'
								className='whitespace-nowrap rounded-md bg-gray-200 px-2 text-white'
							>
								Submit your email
							</button>
						</form>
					</div>
				</div>
				<div className='space-y-6 lg:flex lg:justify-between'>
					<div className='space-y-3 lg:max-w-2xl'>
						<h5 className='font-semibold text-black'>
							{siteTitle}&nbsp;Online store, review, choose and buy online
						</h5>
						<p className='text-justify text-gray-700'>
							Safe online shopping requires stores to be able to provide customers with diverse,
							high-quality, reasonably priced products in a short period of time, with return
							guarantees;&nbsp;
							{siteTitle}. Features that online stores have been working on for years and have built
							up regular customers this way
						</p>
					</div>
					<div></div>
				</div>
				<div className='mt-6 h-1'></div>
			</div>
		</footer>
	)
}
