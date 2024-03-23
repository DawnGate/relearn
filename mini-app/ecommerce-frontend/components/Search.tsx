'use client'
import { useDisclosure } from '@/hooks'
import { Icons, SearchModal } from '@/components'

export const Search = () => {
	// hooks
	const [isShowSearchModal, searchModalHandlers] = useDisclosure()
	// render
	return (
		<div className='flex max-w-3xl flex-grow flex-row'>
			<div
				onClick={searchModalHandlers.open}
				className='flex flex-grow flex-row rounded-md bg-zinc-200/80'
			>
				<button className='flex-1 bg-transparent px-3 py-1 text-left text-gray-400'>
					Be good at fake things and use good search...
				</button>
				<button className='p-2'>
					<Icons.Search className='icon text-gray-400' />
				</button>
			</div>
			<SearchModal isShow={isShowSearchModal} onClose={searchModalHandlers.close} />
		</div>
	)
}
