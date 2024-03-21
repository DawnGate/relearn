import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CacheTags } from './tagsConstant'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '',
	}),
	tagTypes: [
		CacheTags.USER,
		CacheTags.REVIEW,
		CacheTags.DETAILS,
		CacheTags.ORDER,
		CacheTags.PRODUCT,
		CacheTags.CATEGORY,
		CacheTags.SLIDER,
		CacheTags.BANNER,
	],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	endpoints: builder => ({}),
})
