import { db } from '@/helpers'

import { User } from '@/models'
import { FilterQuery } from 'mongoose'

const getOne = async (
	filter: FilterQuery<{
		id: string
	}>,
) => {
	await db.connectDB()
	const user = await User.findOne(filter).lean().exec()

	return user
}

export const usersRepo = {
	getOne,
}
