import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authslice";
import { registerReducer } from "./slices/registerslice";
import { profilereducer } from "./slices/profileslice";
const store = configureStore({
    reducer: {
        auth: authReducer
        , register: registerReducer,
        profile: profilereducer
    },
});

export default store