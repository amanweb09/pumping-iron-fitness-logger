import { createSlice } from "@reduxjs/toolkit"
import { LoggingState } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "./index"

const initialState: LoggingState = {
    sessionId: null,
    logs: []
}

const authSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        initializeSession: (state, action: PayloadAction<LoggingState>) => {
            state.sessionId = action.payload.sessionId
        },
        setLog: (state, action) => {
            // state.logs?.push(action.payload.logs)
            if (state.logs && state.logs.length) {

                // find preacher curls log
                const reqLog = state.logs.find((l) => l.exercise == action.payload.log.exercise)

                // if preacher curl has no logs
                if (!reqLog) {
                    state.logs.push(action.payload.log)
                }

                // log for preacher curls exists (i.e. reqLog)
                else {
                    reqLog.logs.push(action.payload.log.logs[0])
                    state.logs = state.logs.filter((l) => l.exercise != action.payload.log.exercise)
                    state.logs?.push(reqLog)
                }


            } else {
                state.logs = [action.payload.log]
            }

        },
        clearLogs: (state) => {
            state.sessionId = null
            delete state.logs
        }
    }
})

export const { initializeSession, setLog, clearLogs } = authSlice.actions
export const logSelector = () => useSelector((state: RootState) => state.log)
export default authSlice.reducer