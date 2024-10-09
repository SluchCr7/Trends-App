import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage?.getItem("UserInfo") ? JSON.parse(localStorage?.getItem("UserInfo")) : null,
    },
    
    reducers: { // Edit on initial state
        login (state, action) {
            state.user = action.payload;
        },
        logout (state) {
            state.user = null;
        },
        setUserName(state, action) {
            state.user.userName = action.payload
        }
    },
});

const authReducer = authSlice.reducer
const authAction = authSlice.actions

export { authReducer, authAction }