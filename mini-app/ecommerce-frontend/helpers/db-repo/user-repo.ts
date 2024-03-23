import { auth, db } from '@/helpers'

import bcrypt from 'bcryptjs'

import { IUser, User } from '@/models'
import { LoginImpl, RegisterImpl } from '@/types'
import { FilterQuery } from 'mongoose'

const getOne = async (filter: FilterQuery<IUser>) => {
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

	const token = auth.createAccessToken({
		id: newUser._id,
	})

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

const authenticate = async ({ email, password }: LoginImpl) => {
	await db.connectDB()

	const foundUser = await User.findOne({ email })

	if (!foundUser) {
		const error = new Error('User not existed')
		error.name = 'ErrorUserNotExisted'
		throw error
	}

	const isMatch = await bcrypt.compare(password, foundUser.password)

	if (!isMatch) {
		const error = new Error('Incorrect email or password')
		error.name = 'ErrorPasswordNotMatch'
		throw error
	}

	const newToken = auth.createAccessToken({
		id: foundUser._id,
	})

	return {
		user: {
			email: foundUser.email,
			role: foundUser.role,
			root: foundUser.root,
			name: foundUser.name,
		},
		token: newToken,
	}
}

export const usersRepo = {
	getOne,
	create,
	authenticate,
}
