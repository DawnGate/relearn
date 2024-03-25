import { ComponentType, useEffect, useState } from 'react'

export const WithHydrationFix = <T extends object>(ChildrenComponent: ComponentType<T>) => {
	return function NewComponent(props: T) {
		const [isClient, setIsClient] = useState(false)

		useEffect(() => {
			setIsClient(true)
		}, [])

		if (!isClient) return null

		return <ChildrenComponent {...props} />
	}
}
