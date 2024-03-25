import { GetCategoryImpl } from '@/types'

import { apiSlice } from './api'
import { CacheTags } from './tagsConstant'

export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCategories: builder.query<GetCategoryImpl, undefined>({
			query: () => ({
				url: '/api/category',
				method: 'GET',
			}),
			providesTags: result =>
				result
					? [
							...result.data.categories.map(({ _id }) => ({
								type: CacheTags.CATEGORY,
								id: _id,
							})),
							CacheTags.CATEGORY,
						]
					: [CacheTags.CATEGORY],
		}),
	}),
})

export const { useGetCategoriesQuery } = categoryApiSlice
