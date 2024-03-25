import Link from 'next/link'

import { AddressBar, Cart, LogoH, Navbar, Search, Sidebar, SignUp } from '@/components'

export const Header = () => {
	return (
		<header className='bg-white px-4 lg:shadow xl:fixed xl:left-0 xl:right-0 xl:top-0 xl:z-20'>
			<div className='container lg:flex lg:py-2'>
				<div className='inline-flex w-full items-center justify-between border-b lg:mr-8 lg:max-w-min lg:border-b-0'>
					<Link href='/' passHref>
						<LogoH className='h-14 w-40' />
					</Link>
					<Sidebar />
				</div>
				<div className='inline-flex w-full min-w-0 items-center justify-between space-x-10 border-b py-2 lg:border-b-0'>
					<Search />

					<div className='inline-flex items-center space-x-4 pr-4'>
						<SignUp />
						<span className='hidden h-8 w-0.5 bg-gray-300 lg:block'></span>
						<Cart />
					</div>
				</div>
			</div>
			<div className='container relative mx-auto flex justify-between py-2'>
				<Navbar />
				<AddressBar />
			</div>
		</header>
	)
}
