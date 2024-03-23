import Joi from 'joi'
import { NextRequest } from 'next/server'

export const validateMiddleware = async (req: NextRequest, schema?: Joi.Schema) => {
	if (!schema) return

	const options: Joi.ValidationOptions = {
		abortEarly: false,
		allowUnknown: false,
		stripUnknown: true,
	}

	const body = await req.json()
	const { error, value } = schema.validate(body, options)

	if (error) {
		const resErr = new Error(`Validate error: ${error.details.map(x => x.message).join(', ')}`)
		resErr.name = 'ValidateError'
		throw resErr
	}

	req.json = () => value
}
