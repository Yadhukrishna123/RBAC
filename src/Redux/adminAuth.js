import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     admin:null,
     isAuthentication:false,
     token:"s"
}

const adminAuthSlice = createSlice({
    name:"adminAuthSlice",
    initialState,
    reducers:{
        adminAuthSuccess:(state, action) => {
            state.isAuthentication = true
            state.admin = action.payload.admin
        },
        userLogout:(state) => {
            state.isAuthentication=false
            state.admin =null
            state.token =null
        }
    }
})

export const {adminAuthSuccess, userLogout} = adminAuthSlice.actions

export default adminAuthSlice.reducer

