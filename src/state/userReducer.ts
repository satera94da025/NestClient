import {createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { usersAPI } from "../api/usersAPI"
import { userType } from "../App"


const initialState: userType[]  = []

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersAC(state, action: PayloadAction<{ users: Array<userType>}>) {
           return  action.payload.users.map(u => ({...u}))
        },
        deleteUserAC(state, action: PayloadAction<{id: string}>){
            const index = state.findIndex(el => el._id === action.payload.id )
            state.splice(index,1)
        }
        // setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
        //     state.error = action.payload.error
        // },
        // setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
        //     state.isInitialized = action.payload.isInitialized
        // },
    }
})

export const usersReducer = slice.reducer
export const {fetchUsersAC, deleteUserAC} = slice.actions


export const fetchUsersTC = () => (dispatch: Dispatch) => {
    // dispatch(setAppStatusAC( 'loading'))
    usersAPI.fetchUsers().then(res =>
        // console.log(res)
        dispatch(fetchUsersAC({users:res.data}))
            // dispatch(setAppStatusAC('succeeded'))
        )
}

export const deleteUserTC = (id: string) => (dispatch: Dispatch) => {
    // dispatch(setAppStatusAC( 'loading'))
    usersAPI.deleteUser(id).then(res =>
            // console.log(res)
            dispatch(deleteUserAC({id}))
        // dispatch(setAppStatusAC('succeeded'))
    )
}

