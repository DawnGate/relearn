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
SliderSchema.post(/^find/, function () {
	// if (this.op === 'find') {
	// 	docs.forEach(doc => {
	// 		doc._id = doc._id.toString()
	// 		doc.category_id = docs.category_id.toString()
	// 	})
	// }
	// if (this.op === 'findOne' && docs) {
	// 	docs._id = docs._id.toString()
	// 	docs.category_id = docs.category_id.toString()
	// }
})

export const Slider =
	(mongoose.models.slider as Model<ISlider>) || mongoose.model<ISlider>('slider', SliderSchema)
