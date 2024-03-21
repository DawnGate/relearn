import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import type { RootState } from '@/store'

export interface CounterState {
	token: string
	lastScreen: any
}

// read access token from local cookie
const cookie_token_key = 'token'
const token = Cookies.get(cookie_token_key) || ''

const initialState: CounterState = {
	token: token,
	lastScreen: null,
}

export const counterSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLogout: state => {
			Cookies.remove(cookie_token_key)
			state.token = ''
		},
		userLogin: (state, action: PayloadAction<string>) => {
			Cookies.set(cookie_token_key, action.payload, { expires: 10 })
			state.token = action.payload
		},
	},
})

export const { userLogin, userLogout } = counterSlice.actions

export const selectUserToken = (state: RootState) => state.user.token

export default counterSlice.reducer
