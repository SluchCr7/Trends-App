import axios from "axios"
import { Children, createContext, useState } from "react"
import { useSelector } from "react-redux"
export const verifyContext = createContext()

const VerifyContextProvider = ({ children }) => {
    const [verifyStatus , setVerifyStatus] = useState(false)
    const verifyAccount = (id ,token) => {
        axios.get(`http://localhost:3001/api/auth/${id}/verify/${token}`)
        .then(res => {
            setVerifyStatus(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (      
        <verifyContext.Provider value={{verifyAccount , verifyStatus}}>
            {children}
        </verifyContext.Provider>
    )
}

export default VerifyContextProvider