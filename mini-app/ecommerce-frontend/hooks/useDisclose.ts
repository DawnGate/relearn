'use client'

import { useState } from 'react'

export const useDisclosure = (): [
	boolean,
	{
		open: () => void
		close: () => void
		toggle: () => void
	},
] => {
	const [isOpen, setIsOpen] = useState(false)

	const open = () => {
		if (!isOpen) {
			setIsOpen(true)
		}
	}

	const close = () => {
		if (isOpen) {
			setIsOpen(false)
		}
	}

	const toggle = () => {
		isOpen ? close() : open()
	}

	return [isOpen, { open, close, toggle }]
}
