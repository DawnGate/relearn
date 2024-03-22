import { Alert } from '@/components'
import StoreProvider from '../StoreProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<StoreProvider>
			{children}
			<Alert />
		</StoreProvider>
	)
}

export default Layout
