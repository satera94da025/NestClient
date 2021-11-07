import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
// import {authAPI} from "../api/todolist-api";
// import {setIsLoggedInAC} from "../features/Login/auth-reducer";
// import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions


// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     authAPI.me().then(res => {
//         if (res.data.resultCode === 0) {
//     //         dispatch(setIsLoggedInAC(true))
//     //         dispatch(setAppInitializedAC(true))
//     //     } else {
//     //         handleServerAppError(res.data, dispatch)
//     //     }
//     //     dispatch(setAppInitializedAC(true))
//     // }).catch((error) => {
//     //     handleServerNetworkError(error, dispatch)
//     })
// }