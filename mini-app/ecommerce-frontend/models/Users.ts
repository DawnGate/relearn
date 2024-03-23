import mongoose, { Model } from 'mongoose'
import { basePlugin } from './base_model'

export interface IUser extends mongoose.Document {
	name: string
	email: string
	password: string
	role: 'user' | 'admin' | 'root'
	root: boolean
	mobile: string
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: 'user' },
		root: { type: Boolean, default: false },
		mobile: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

UserSchema.plugin(basePlugin)

export const User =
	(mongoose.models.user as Model<IUser>) || mongoose.model<IUser>('user', UserSchema)
