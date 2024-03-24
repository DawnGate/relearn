import { Children, ReactNode, isValidElement, cloneElement } from 'react'

interface Props {
	children: ReactNode
	count: number
}

interface ItemsProps {
	children: ReactNode
	index?: number
	className?: string
}

interface ItemProps {
	index?: number
	height?: string
	width?: string
	children?: ReactNode
	animated?: string
	className?: string
}

export const Skeleton = ({ children, count }: Props) => {
	const arr = Array(count).fill('_')

	return (
		<>
			{arr.map((i, index) =>
				Children.map(children, child => {
					if (isValidElement<ItemsProps>(child)) {
						return cloneElement(child, { index })
					}
					return child
				}),
			)}
		</>
	)
}

const Items = ({ children, index, className }: ItemsProps) => {
	return (
		<div className={className}>
			{Children.map(children, child => {
				if (isValidElement<ItemProps>(child)) {
					return cloneElement(child, { index })
				}
				return child
			})}
		</div>
	)
}

const Item = ({ children, className, animated, width, height, index }: ItemProps) => {
	let itemClassName = 'bg-white'

	switch (animated) {
		case 'background':
			itemClassName = 'animate-pulse bg-red-200'
			break
		case 'border':
			itemClassName = 'animate-pulse border-2 border-red-200'
			break
		default:
			break
	}

	return (
		<div key={index} className={`${height} ${width} ${itemClassName} rounded-md ${className}`}>
			{children}
		</div>
	)
}

Skeleton.Items = Items
Skeleton.Item = Item

export default Skeleton
