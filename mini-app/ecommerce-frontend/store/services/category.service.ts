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
			providesTags: [CacheTags.CATEGORY],
		}),
	}),
})

export const { useGetCategoriesQuery } = categoryApiSlice
