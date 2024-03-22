import { LoginImpl, LoginResponseImpl, RegisterImpl } from '@/types'
import { apiSlice } from './api'
import { CacheTags } from './tagsConstant'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<LoginResponseImpl, { body: LoginImpl }>({
			query: ({ body }) => ({
				url: '/api/auth/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: [
				CacheTags.USER,
				CacheTags.REVIEW,
				CacheTags.DETAILS,
				CacheTags.ORDER,
				CacheTags.PRODUCT,
				CacheTags.CATEGORY,
				CacheTags.SLIDER,
				CacheTags.BANNER,
			],
		}),
		getUserInfo: builder.query({
			query: () => ({
				url: '/api/auth/user',
				method: 'GET',
			}),
			providesTags: [CacheTags.USER],
		}),
		createUser: builder.mutation<
			LoginResponseImpl,
			{ body: Omit<RegisterImpl, 'confirmPassword'> }
		>({
			query: ({ body }) => ({
				url: '/api/auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [
				CacheTags.USER,
				CacheTags.REVIEW,
				CacheTags.DETAILS,
				CacheTags.ORDER,
				CacheTags.PRODUCT,
				CacheTags.CATEGORY,
				CacheTags.SLIDER,
				CacheTags.BANNER,
			],
		}),
	}),
})

export const { useLoginMutation, useCreateUserMutation, useGetUserInfoQuery } = userApiSlice
