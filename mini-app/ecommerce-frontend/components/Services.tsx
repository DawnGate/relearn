import {
	CashOnDelivery,
	DaysReturn,
	ExpressDelivery,
	OriginalProducts,
	Support,
} from '@/components'

export const Services = () => {
	const services = [
		{
			name: 'Possibility of express delivery',
			icon: <ExpressDelivery className='h-10 w-10' />,
		},
		{
			name: '24 hours a day, 7 days a week',
			icon: <Support className='h-10 w-10' />,
		},
		{
			name: 'You can pay on the spot',
			icon: <CashOnDelivery className='h-10 w-10' />,
		},
		{
			name: 'Seven-day return guarantee',
			icon: <DaysReturn className='h-10 w-10' />,
		},
		{
			name: 'Guarantee the originality of the product',
			icon: <OriginalProducts className='h-10 w-10' />,
		},
	]
	return (
		<div className='border-t-1 hidden items-center justify-evenly border-b-2 border-gray-200 py-5 lg:flex'>
			{services.map(item => (
				<div key={item.name} className='flex items-center gap-x-1'>
					{item.icon}
					<p className='text-xs'>{item.name}</p>
				</div>
			))}
		</div>
	)
}
