import { ButtonHTMLAttributes } from 'react'

import { Loading } from '@/components'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean
	isRounded?: boolean
}

export const Button = (props: ButtonProps) => {
	const {
		type = 'button',
		isLoading = false,
		isRounded = false,
		className = '',
		disabled,
		children,
		...resProps
	} = props

	const buttonClassName = `button ${isRounded ? 'rounded-3xl' : ''} ${className}`

	return (
		<button type={type} disabled={isLoading || disabled} className={buttonClassName} {...resProps}>
			{isLoading ? <Loading /> : children}
		</button>
	)
}

export const LoginButton = (props: ButtonProps) => {
	return <Button type='submit' className='mx-auto w-44' isRounded {...props} />
}
