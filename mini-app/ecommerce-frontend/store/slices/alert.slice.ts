import { AlertStatusImpl } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export interface AlertState {
	title: string
	status: AlertStatusImpl
	isShow: boolean
}

const initialState: AlertState = {
	title: '',
	status: '',
	isShow: false,
}

// ? This slice for demo
export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (state, action: PayloadAction<Omit<AlertState, 'isShow'>>) => {
			state.isShow = true
			state.title = action.payload.title
			state.status = action.payload.status
		},
		removeAlert: () => {
			return initialState
		},
	},
})

export const { showAlert, removeAlert } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer
