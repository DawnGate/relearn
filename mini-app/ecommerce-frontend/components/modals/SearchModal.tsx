'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { Icons, Modal } from '@/components'
import { useDebounce } from '@/hooks'

interface Props {
	isShow: boolean
	onClose: () => void
}

export const SearchModal = ({ isShow, onClose }: Props) => {
	// state
	const [search, setSearch] = useState('')

	const debouncedSearch = useDebounce(search, 1200)

	console.log(debouncedSearch)

	// handler
	const handleRemoveSearch = () => {
		setSearch('')
	}

	const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		if (!isShow) {
			setSearch('')
		}
	}, [isShow])

	// TODO: Show search data

	// render
	return (
		<Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
			<Modal.Content className='flex h-screen flex-col gap-y-3 bg-white py-3 pl-2 pr-4 md:rounded-lg lg:h-fit'>
				<Modal.Header>Search</Modal.Header>
				<Modal.Body>
					<div className='my-3 flex flex-row rounded-md bg-zinc-200/80'>
						<div className='p-2'>
							<Icons.Search className='icon text-gray-500' />
						</div>
						<input
							type='text'
							placeholder='Search'
							value={search}
							onChange={handleChangeSearch}
							className='input flex-grow bg-transparent p-1 text-left outline-none focus:border-none'
						/>
						<button type='button' className='p-2' onClick={handleRemoveSearch}>
							<Icons.Close className='icon text-gray-500' />
						</button>
					</div>
					<div className='overflow-y-auto lg:max-h-[500px]'>{/* Show wrapper search item */}</div>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}
