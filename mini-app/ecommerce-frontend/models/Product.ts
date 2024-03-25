import mongoose, { Model } from 'mongoose'
import { basePlugin } from './base_model'

// Interface Product Model
export interface IMProduct {
	title: string
	price: number
	description?: string
	discount?: number
	images: { url: string }[]
	sizes?: {
		id: string
		size: string
	}[]
	colors?: {
		id: string
		name: string
		hashCode: string
	}[]
	category?: string[]
	category_levels?: {
		level_one?: string
		level_two?: string
		level_three?: string
	}
	inStock: number
	sold: number
	info?: {
		title: string
		value: string
	}[]
	specification: {
		title: string
		value: string
	}[]
	rating: number
	numReviews: number
}

export type IProduct = IMProduct & mongoose.Document

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		discount: {
			type: Number,
			default: 0,
		},
		images: [
			{
				url: {
					type: String,
					required: true,
				},
			},
		],
		sizes: [
			{
				id: {
					type: String,
					required: true,
				},
				size: {
					type: String,
					required: true,
				},
			},
		],
		colors: [
			{
				id: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				hashCode: {
					type: String,
					required: true,
				},
			},
		],
		category: [{ type: String, required: true }],
		category_levels: {
			level_one: {
				type: mongoose.Types.ObjectId,
				ref: 'category',
			},
			level_two: {
				type: mongoose.Types.ObjectId,
				ref: 'category',
			},
			level_three: {
				type: mongoose.Types.ObjectId,
				ref: 'category',
			},
		},
		inStock: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		info: [
			{
				title: { type: String, required: true },
				value: { type: String, required: true },
			},
		],
		specification: [
			{
				title: { type: String, required: true },
				value: { type: String, required: true },
			},
		],
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true,
	},
)

ProductSchema.plugin(basePlugin)
// ProductSchema.post(/^find/, function (docs: IProduct[]) {})

export const Product =
	(mongoose.models.product as Model<IProduct>) || mongoose.model<IProduct>('product', ProductSchema)
