interface Props {
	discount: number
}

export const DiscountProduct = ({ discount }: Props) => {
	return (
		<span className='inline-block rounded-xl bg-red-500 px-2 py-0.5 tracking-wide text-white'>
			{discount} %
		</span>
	)
}
