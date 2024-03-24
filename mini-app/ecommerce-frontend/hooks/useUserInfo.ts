import { useAppDispatch } from '@/store/hooks'
import { useVerify } from '@/hooks'
import { useGetUserInfoQuery } from '@/store/services'
import { userLogout } from '@/store/slices'

export const useUserInfo = () => {
	const appDispatch = useAppDispatch()
	const isVerify = useVerify()

	const { data, isLoading, error, isError } = useGetUserInfoQuery(undefined, {
		skip: !isVerify,
	})

	if (!isVerify) {
		appDispatch(userLogout())
	}

	return { userInfo: data?.data, isVerify, isLoading, error, isError }
}
