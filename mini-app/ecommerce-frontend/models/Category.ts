import mongoose, { Model } from 'mongoose'
import { basePlugin } from './base_model'

// Interface Category Model
export interface IMCategory {
	name: string
	slug: string
	parent?: ICategory | string
	image: string
	colors?: {
		start: string
		end: string
	}
	level: number
}

export type ICategory = IMCategory & mongoose.Document

const CategorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		parent: {
			type: mongoose.Types.ObjectId,
			ref: 'category',
		},
		image: {
			type: String,
			required: true,
		},
		colors: {
			start: String,
			end: String,
		},
		level: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
)

CategorySchema.plugin(basePlugin)
// CategorySchema.post(/^find/, function (docs: ICategory[]) {})

export const Category =
	(mongoose.models.category as Model<ICategory>) ||
	mongoose.model<ICategory>('category', CategorySchema)
