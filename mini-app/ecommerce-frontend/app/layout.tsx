import '@/styles/main.css'
import '@/styles/browser-styles.css'

import type { Metadata } from 'next'

import { enSiteTitle, siteDescription, siteTitle } from '@/utils'
import { Suspense } from 'react'

import { Loading } from '@/components'

// import { Vazirmatn } from 'next/font/google'
// const vanir = Vazirmatn({
// 	subsets: ['latin'],
// 	weight: ['300', '400', '500', '600', '700'],
// })

export const metadata: Metadata = {
	title: `${siteTitle} | ${enSiteTitle}`,
	description: siteDescription,
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</body>
		</html>
	)
}
