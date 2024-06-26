import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import loggingSlice from './logging-slice'

const createStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice,
            log: loggingSlice
        }
    })
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default createStore