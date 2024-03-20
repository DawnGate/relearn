import StoreProvider from '../StoreProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <StoreProvider>{children}</StoreProvider>
}

export default Layout
