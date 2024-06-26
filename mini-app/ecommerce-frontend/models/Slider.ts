import mongoose, { Model } from 'mongoose'
import { basePlugin } from './base_model'

import { ICategory } from '.'

// Interface Slider Model
export interface IMSlider {
	category_id: ICategory
	image: {
		url: string
	}
	title: string
	uri: string
	isPublic: boolean
}

export type ISlider = IMSlider & mongoose.Document

const SliderSchema = new mongoose.Schema<ISlider>(
	{
		category_id: {
			type: mongoose.Types.ObjectId,
			ref: 'category',
			required: true,
		},
		image: {
			url: {
				type: String,
				required: true,
			},
		},
		title: {
			type: String,
			required: true,
		},
		uri: {
			type: String,
		},
		isPublic: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
	},
)

SliderSchema.plugin(basePlugin)
// Can't => using lean for this purpose
// SliderSchema.post('find', function (docs: ISlider[]) {
// 	docs.forEach(doc => {
// 		doc._id = doc._id.toString()
// 		doc.category_id = doc.category_id.toString()
// 	})
// })

// SliderSchema.post('findOne', function (docs) {
// 	docs._id = docs._id.toString()
// 	docs.category_id = docs.category_id.toString()
// })

export const Slider =
	(mongoose.models.slider as Model<ISlider>) || mongoose.model<ISlider>('slider', SliderSchema)
