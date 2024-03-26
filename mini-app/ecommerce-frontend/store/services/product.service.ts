import { GetProductsImpl } from '@/types'
import { apiSlice } from './api'
import { CacheTags } from './tagsConstant'

interface IProductSearch {
	category: string
	page: number
	page_size: number
	sort: number
	search: string
	inStock: boolean
	discount: boolean
	price: string // format range from XXX - XXX -> 12-1000
}

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<GetProductsImpl, Partial<IProductSearch>>({
			query: ({ category, page, page_size, sort, search, inStock, discount, price }) => {
				const queryParams = new URLSearchParams()

				Object.entries({
					category,
					page,
					page_size,
					sort,
					search,
					inStock,
					discount,
					price,
				}).forEach(([key, value]) => {
					if (value) queryParams.set(key, value.toString())
				})

				return {
					url: `/api/product?${queryParams.toString()}`,
					method: 'GET',
				}
			},
			providesTags: result =>
				result
					? [
							...result.data.products.map(({ _id }) => ({
								type: CacheTags.PRODUCT,
								id: _id,
							})),
							CacheTags.PRODUCT,
						]
					: [CacheTags.PRODUCT],
		}),
	}),
})

export const { useGetProductsQuery } = productApiSlice
