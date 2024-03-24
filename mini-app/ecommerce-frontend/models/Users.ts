import mongoose, { Model } from 'mongoose'
import { basePlugin } from './base_model'

// Interface User Model
export interface IMUser {
	name: string
	email: string
	password: string
	role: 'user' | 'admin' | 'root'
	root: boolean
	mobile: string
	address?: {
		postalCode: string
		street: string
		area: {
			code: string
			name: string
			cityCode: string
			provinceCode: string
		}
		city: {
			code: string
			name: string
			provinceCode: string
		}
		province: {
			code: string
			name: string
		}
	}
}

export type IUser = IMUser & mongoose.Document

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
		address: {
			type: {
				postalCode: {
					type: String,
				},
				street: {
					type: String,
				},
				area: {
					code: {
						type: String,
					},
					name: {
						type: String,
					},
					cityCode: {
						type: String,
					},
					provinceCode: {
						type: String,
					},
				},
				city: {
					code: {
						type: String,
					},
					name: {
						type: String,
					},
					provinceCode: {
						type: String,
					},
				},
				province: {
					code: {
						type: String,
					},
					name: {
						type: String,
					},
				},
			},
			required: false,
		},
	},
	{
		timestamps: true,
	},
)

UserSchema.plugin(basePlugin)

export const User =
	(mongoose.models.user as Model<IUser>) || mongoose.model<IUser>('user', UserSchema)
