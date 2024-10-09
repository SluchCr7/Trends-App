import { profileAction } from "../slices/profileslice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { authAction } from "../slices/authslice";

export const ProfileGetData = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/auth/${userId}`)
            dispatch(profileAction.setProfile(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const UploadNewProfilePhoto = (newPhoto , getState) => {
    return async (dispatch) => {
        try {
            const state = getState()
            const {data} = await axios.post("http://localhost:3001/api/auth/photo", newPhoto , {
                headers: {
                    Authorization : `Bearer ${state.auth.user.token}` ,
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(profileAction.setProfilePhoto(data.profilePhoto))
            toast.success(data.message)
        } catch (error) {
            toast.error("Error : Image Error")
        }
    }
}

// Update Profile

export const UpdateProfile = (userId, Profile , getState) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.put(`http://localhost:3001/api/auth/profile/${userId}`, Profile, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${getState().auth.user.token}`
                }
                
            })  
            dispatch(profileAction.updateProfile(data))
            dispatch(authAction.setUserName(data.userName))
            const user = JSON.parse(localStorage.getItem("UserInfo"))
            user.userName = data?.userName
            localStorage.setItem("UserInfo" , JSON.stringify(user))
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
}