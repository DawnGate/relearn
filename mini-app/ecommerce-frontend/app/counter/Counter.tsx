'use client'

import { selectCount, increment } from '@/store/features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const Counter = () => {
	const count = useAppSelector(selectCount)
	const dispatch = useAppDispatch()

	const incrementCount = () => {
		dispatch(increment())
	}

	return (
		<div>
			<div>Counter: {count}</div>
			<div>-</div>
			<button className='rounded-sm border bg-white p-2 text-rose-500' onClick={incrementCount}>
				Increment value
			</button>
		</div>
	)
}

export default Counter
