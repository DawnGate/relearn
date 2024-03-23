import { Alert, PageLoading } from '@/components'
import StoreProvider from '../StoreProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<StoreProvider>
			{children}
			<PageLoading />
			<Alert />
		</StoreProvider>
	)
}

export default Layout
