import { IMUser } from '@/models'

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

export type AlertStatusImpl = 'success' | 'error' | 'exclamation' | 'question' | ''
