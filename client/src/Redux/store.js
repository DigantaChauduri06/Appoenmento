import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { alertSlice } from './slice/alertsSlice'
import { userSlice } from './slice/userSlice';

const rootReducer = combineReducers({
    alerts: alertSlice.reducer,
    user: userSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})
export default store


