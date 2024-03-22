import { Schema } from 'mongoose'

export const basePlugin = (schema: Schema) => {
	schema.set('toJSON', { getters: true, virtuals: false })
	schema.set('toObject', { getters: true })
}
