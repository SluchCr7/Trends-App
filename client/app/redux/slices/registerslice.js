import { createSlice } from "@reduxjs/toolkit";


const registerSlice = createSlice({
    name: "register",
    initialState: {
        registermessage: "",
        isEmailVerify : false
    },
    reducers: {
        Setregister: (state, action) => {
            state.registermessage = action.payload
        },
        setVeriverification: (state) => {
            state.isEmailVerify = true;
            state.registermessage = null;
        }
    }
})

const registerReducer = registerSlice.reducer
const registerAction = registerSlice.actions

export { registerReducer, registerAction }