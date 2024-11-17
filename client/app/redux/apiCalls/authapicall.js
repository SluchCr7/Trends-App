import { authAction } from "../slices/authslice";
import { registerAction } from "../slices/registerslice";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';// Login API Call
export const LoginUser = (user) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post("http://localhost:3001/api/auth/login", user)
            dispatch(authAction.login(data))
            localStorage.setItem("UserInfo", JSON.stringify(data))
        } catch (error) {
            // toast.error(error.response)
            console.log(error)
        }
    }
}

export const LogoutUser = () => {
    return async (dispatch) => {
        dispatch(authAction.logout())
        localStorage.removeItem("UserInfo")
    }
}



