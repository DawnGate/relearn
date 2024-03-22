import mongoose from 'mongoose'

declare global {
	// eslint-disable-next-line no-var
	var mongooseDB: any
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

// ? Using this because in develop the connect can be call multiple time
let cached = globalThis.mongooseDB

if (!cached) {
	cached = globalThis.mongooseDB = {
		conn: null,
		promise: null,
	}
}

const connectDB = async () => {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				// ! https://mongoosejs.com/docs/connections.html
				// ? prevent using Model before connection
				bufferCommands: false,
			})
			.then(mongoose => {
				return mongoose
			})
	}

	try {
		cached.conn = await cached.promise
		console.log('connect db success')
	} catch (err) {
		cached.promise = null
		throw err
	}
}

const disconnectDB = () => {}

export const db = { connectDB, disconnectDB }
