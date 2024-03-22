'use client'

import React, { HTMLAttributes, ReactNode, useEffect } from 'react'

import { Icons } from '@/components'

interface ModalProps {
	children: React.ReactNode
	onClose: () => void
	effect: string
	isShow: boolean
}

type ModalChildProps = {
	onClose?: () => void
	children: ReactNode
}

// ! This is solution for the problem when cloneElement and pass more props to children
// https://medium.com/@cristiansima/typescript-ing-react-cloneelement-or-how-to-type-a-child-element-with-props-injected-by-the-parent-73b6ad485f8b
const ModalContainer = ({ children, onClose, effect, isShow }: ModalProps) => {
	let effectClassName

	useEffect(() => {
		if (isShow) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isShow])

	switch (effect) {
		case 'bottom-to-top':
			effectClassName = `${isShow ? 'bottom-0 lg:mt-20' : '-bottom-full lg:mt-60'} w-full h-full lg:h-auto lg:max-w-3xl transition-all duration-700 mx-auto relative`
			break
		case 'ease-out':
			effectClassName = `${isShow ? 'top-40 transform scale-100' : 'top-40 transform scale-50'} max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto relative`
			break
		case 'bottom-to-fit':
			effectClassName = `${isShow ? 'bottom-0' : '-bottom-full'} w-full h-fit lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto relative`
			break
		default:
			effectClassName = ''
			break
	}

	const containerClassName = `
    ${isShow ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-500 fixed overflow-y-auto inset-0
    `

	// ? Try to pass props to children element
	return (
		<div className={containerClassName}>
			<div
				className='
            fixed inset-0 h-screen w-screen bg-gray-400/20 
            '
				onClick={onClose}
			/>
			<div className={effectClassName}>
				{React.Children.map(children, child => {
					if (React.isValidElement<ModalChildProps>(child)) {
						return React.cloneElement(child, { onClose })
					}

					return child
				})}
			</div>
		</div>
	)
}

const Content = ({
	onClose,
	children,
	...restProps
}: HTMLAttributes<HTMLElement> & ModalChildProps) => {
	return (
		<div {...restProps}>
			{React.Children.map(children, child => {
				if (React.isValidElement<ModalChildProps>(child)) {
					return React.cloneElement(child, { onClose })
				}
				return child
			})}
		</div>
	)
}

const Header = ({ onClose, children }: ModalChildProps) => {
	return (
		<div className='flex items-center justify-between border-b-2 border-gray-200 pb-2'>
			<span className='text-sm'>{children}</span>
			<button onClick={onClose} className='p-1'>
				<Icons.Close className='icon' />
			</button>
		</div>
	)
}

const Body = ({ children }: { children: ReactNode }) => {
	return <>{children}</>
}

ModalContainer.Content = Content
ModalContainer.Body = Body
ModalContainer.Header = Header

export const Modal = ModalContainer
