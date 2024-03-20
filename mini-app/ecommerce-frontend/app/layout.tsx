import '@/styles/main.css'
import '@/styles/browser-styles.css'

import type { Metadata } from 'next'

import { Vazirmatn } from 'next/font/google'

import { enSiteTitle, siteDescription, siteTitle } from '@/utils'

const vanir = Vazirmatn({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
})

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
			<body className={vanir.className}>{children}</body>
		</html>
	)
}
