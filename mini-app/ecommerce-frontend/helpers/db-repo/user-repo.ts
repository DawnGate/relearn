import { auth, db } from '@/helpers'

import bcrypt from 'bcryptjs'

import { User } from '@/models'
import { RegisterImpl } from '@/types'
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

const create = async ({ email, name, password }: Omit<RegisterImpl, 'confirmPassword'>) => {
	await db.connectDB()

	const foundExitUser = await User.findOne({ email })
	if (foundExitUser) {
		const userExitsError = new Error(`email: ${email}, account already exists`)
		userExitsError.name = 'UserExistsError'
		throw userExitsError
	}

	const hashPassword = await bcrypt.hash(password, 12)
	const newUser = new User({ name, email, password: hashPassword })
	await newUser.save()

	const token = auth.createAccessToken(newUser._id)

	return {
		user: {
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			root: newUser.root,
		},
		token,
	}
}

export const usersRepo = {
	getOne,
	create,
}
