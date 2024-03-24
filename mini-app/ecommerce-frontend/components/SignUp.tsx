'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons, Skeleton } from '@/components'
import { useUserInfo } from '@/hooks'

export const SignUp = () => {
	const pathname = usePathname()
	// TODO Display when verify user
	const { userInfo, isVerify, isLoading } = useUserInfo()

	console.log(isVerify, userInfo, isLoading)

	if (isLoading) {
		return <Skeleton.Item height='h-8' width='w-7 lg:w-12' animated='background' />
	}

	if (!isVerify) {
		return (
			<div className='flex-center gap-x-3 text-sm lg:rounded-md lg:border lg:border-gray-300 lg:px-3 lg:py-2'>
				<Link href={`/register?redirectTo=${pathname}`} className='hidden px-2 lg:block'>
					Register
				</Link>
				<span className='hidden h-6 w-0.5 bg-gray-300 lg:block'></span>
				<Link href={`/login?redirectTo=${pathname}`} className='flex-center gap-x-1'>
					<p>Log in</p>
					<Icons.Login className='icon' />
				</Link>
			</div>
		)
	} else {
		return (
			<>
				<Link href='/profile'>
					<Icons.User className='icon h-7 w-7' />
				</Link>
				<div className='hidden lg:block'>User: {userInfo?.name}</div>
			</>
		)
	}
}
