export const formatNumber = (num: number) => {
	if (num) {
		const newNumber = num.toString()

		return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
	return ''
}
