import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:
        typeof window !== "undefined" && localStorage?.getItem("UserInfo")
            ?
            JSON.parse(localStorage.getItem("UserInfo"))
            : null,
};


const authSlice = createSlice({
    name: "auth",
    initialState : initialState,
    reducers: {
        login(state, { payload }) {
            state.user = payload;
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