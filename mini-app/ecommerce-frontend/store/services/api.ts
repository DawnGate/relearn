import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CacheTags } from './tagsConstant'
import { RootState } from '@/store'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.token
			// If we have a token set in state, let's assume that we should be passing it.
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
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
