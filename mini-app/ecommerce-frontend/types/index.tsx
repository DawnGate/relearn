export type LoginImpl = {
	email: string
	password: string
}

export type ResponseImpl<T> = {
	data: T
	message: string
}

export type LoginResponseImpl = ResponseImpl<{
	token: string
}>

export type AlertStatusImpl = 'success' | 'error' | 'exclamation' | 'question' | ''
