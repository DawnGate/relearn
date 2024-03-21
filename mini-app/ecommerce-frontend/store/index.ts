import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counter/counterSlice'
import userReducer from './slices/counter/user.slice'

import { apiSlice } from './services/api'

export const makeStore = () => {
	return configureStore({
		reducer: {
			counter: counterReducer,
			user: userReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// TODO: refetchOnMount with setupListeners
