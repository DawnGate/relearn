import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counter.slice'
import userReducer from './slices/user.slice'
import alertReducer from './slices/alert.slice'

import { apiSlice } from './services/api'

export const makeStore = () => {
	return configureStore({
		reducer: {
			counter: counterReducer,
			user: userReducer,
			alert: alertReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// TODO: refetchOnMount with setupListeners
