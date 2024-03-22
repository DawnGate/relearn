export const setJson = <T>({
	code,
	message,
	data,
}: {
	code?: number
	message?: string
	data: T
}) => {
	return {
		code: code || 0,
		message: message || 'ok',
		data: data || null,
	}
}
