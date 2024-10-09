import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
    },
    reducers: {
        setProfile :(state , action) => {
            state.profile = action.payload;
        },
        setProfilePhoto: (state, action) => {
            state.profile.profilePhoto = action.payload;
        },
        updateProfile : (state, action) =>{
            state.profile = action.payload
        }
    },
});

const profilereducer = profileSlice.reducer;
const profileAction = profileSlice.actions;
export { profilereducer, profileAction }