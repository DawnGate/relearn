import { ReactNode } from 'react'
import { BigLoading, Button, EmptyCustomList } from '@/components'

interface Props {
	isError?: boolean
	error?: {
		data: {
			message: string
		}
	}
	refetch?: () => void
	isFetching?: boolean
	isSuccess?: boolean
	dataLength?: number
	emptyComponent?: ReactNode
	loadingComponent?: ReactNode
	children: ReactNode
}

export const ShowWrapper = ({
	isError,
	error,
	isFetching,
	isSuccess,
	refetch,
	dataLength = 0,
	emptyComponent,
	loadingComponent,
	children,
}: Props) => {
	let content = null

	if (isError) {
		content = (
			<div className='mx-auto w-fit space-y-3 py-20 text-center'>
				<h5 className='text-xl'>Abnormal</h5>
				<p className='text-lg text-red-500'>{error?.data.message}</p>
				<Button className='mx-auto' onClick={refetch}>
					Retry
				</Button>
			</div>
		)
	} else if (isFetching) {
		content = <div className='px-3'>{loadingComponent || <BigLoading />}</div>
	} else if (isSuccess && dataLength > 0) {
		content = <>{children}</>
	} else if (isSuccess && dataLength === 0) {
		content = <>{emptyComponent || <EmptyCustomList />}</>
	}

	return <section>{content}</section>
}
