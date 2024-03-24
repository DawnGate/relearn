import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Login',
}

const Layout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>
}

export default Layout
