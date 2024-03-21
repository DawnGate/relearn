import { Footer, Header } from '@/components'

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
