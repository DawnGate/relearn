'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import {
	DiscountProduct,
	EmptySearchList,
	Icons,
	Modal,
	ProductPrice,
	ResponsiveImage,
	ShowWrapper,
} from '@/components'

import { useDebounce } from '@/hooks'

import { useGetProductsQuery } from '@/store/services'
import Link from 'next/link'
import { truncate } from '@/utils'

interface Props {
	isShow: boolean
	onClose: () => void
}

export const SearchModal = ({ isShow, onClose }: Props) => {
	// state
	const [search, setSearch] = useState('')

	const debouncedSearch = useDebounce(search, 1200)

	const { data, isSuccess, isFetching, error, isError, refetch } = useGetProductsQuery(
		{
			search,
		},
		{
			skip: !debouncedSearch || search !== debouncedSearch,
		},
	)

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
					<div className='overflow-y-auto lg:max-h-[500px]'>
						<ShowWrapper
							isError={isError}
							error={error as any}
							refetch={refetch}
							isFetching={isFetching}
							isSuccess={isSuccess}
							dataLength={data ? data?.data.productsLength : 0}
							emptyComponent={<EmptySearchList />}
						>
							<div className='space-y-3 divide-y px-4 py-3'>
								{data?.data?.productsLength &&
									data.data.productsLength > 0 &&
									search.length &&
									data.data.products.map(product => (
										<article key={product._id} className='py-2'>
											<Link href={`/products/${product._id}`} onClick={onClose}>
												<ResponsiveImage
													dimensions='w-20 h-20'
													src={product.images[0].url}
													alt={product.title}
												/>
												<span className='py-2 text-sm'>{truncate(product.title, 70)}</span>
												<div className='flex justify-between'>
													<div>
														{!!product.discount && product.discount > 0 && (
															<DiscountProduct discount={product.discount} />
														)}
													</div>
													<ProductPrice
														inStock={product?.inStock}
														discount={product?.discount ?? 0}
														price={product.price}
													/>
												</div>
											</Link>
										</article>
									))}
							</div>
						</ShowWrapper>
					</div>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}
