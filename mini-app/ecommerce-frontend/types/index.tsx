import { IMCategory, IMProduct, IMUser } from '@/models'

export type LoginImpl = {
	email: string
	password: string
}

export type RegisterImpl = {
	email: string
	name: string
	password: string
	confirmPassword: string
}

export type ResponseImpl<T> = {
	data: T
	message: string
	code: number
}

export type LoginResponseImpl = ResponseImpl<{
	token: string
}>

export type GetUserInfoImpl = ResponseImpl<Omit<IMUser, 'password'>>

export type CategoryWithChild = IMCategory & {
	child?: CategoryWithChild[]
	_id: string
}
export type GetCategoryImpl = ResponseImpl<{
	categories: CategoryWithChild[]
	categoriesList: CategoryWithChild
}>

export type GetProductsImpl = ResponseImpl<{
	mainMaxPrice: number
	mainMinPrice: number
	products: Array<IMProduct & { _id: string }>
	productsLength: number
	pagination: {
		currentPage: number
		nextPage: number
		previousPage: number
		hasNextPage: boolean
		hastPreviousPage: boolean
		lastPage: number
	}
}>

export type AlertStatusImpl = 'success' | 'error' | 'exclamation' | 'question' | ''
