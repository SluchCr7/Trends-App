import { registerAction } from "../slices/registerslice";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
export const RegisterUser = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("http://localhost:3001/api/auth/register", user)
            dispatch(registerAction.Setregister(data.message))
            console.log(data)
        } catch (error) {
            toast.error(error.response.data)
        }
    }
}
export const VerifecationEmail = (userId , token) => {
    return async (dispatch) => {
        try {
            await axios.get(`http://localhost:3001/api/auth/${userId}/verify/${token}`)
            dispatch(registerAction.setVeriverification())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}