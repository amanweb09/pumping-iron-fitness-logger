import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import {RootState} from "./index"

const initialState: AuthState = {
    isAuth: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.isAuth = action.payload.isAuth,
                state.user = action.payload.user
        }
    }
})

export const { setAuth } = authSlice.actions
export const authSelector = () => useSelector((state:RootState) => state.auth)
export default authSlice.reducer