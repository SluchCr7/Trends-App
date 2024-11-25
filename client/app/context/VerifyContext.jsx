'use client'
import axios from "axios"
import { createContext, useState , useEffect } from "react"
import { useSelector } from "react-redux"
export const verifyContext = createContext()
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VerifyContextProvider = ({ children }) => {
    const [verifyStatus, setVerifyStatus] = useState(false)
    const [users , setUsers] = useState([])
    const verifyAccount = (id ,token) => {
        axios.get(`http://localhost:3001/api/auth/${id}/verify/${token}`)
        .then(res => {
            console.log(res.data)
            setVerifyStatus(true)
            toast.success("Account Verified")
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        axios.get("http://localhost:3001/api/auth")
            .then(res => {
                // console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [users])
    const deleteUser = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3001/api/auth/${id}`)
                .then(res => {
                    console.log(res.data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
              swal("Your imaginary file is safe!");
              }
          });
    }
    return (    
        <>        
            <ToastContainer />
            <verifyContext.Provider
                value={{ verifyAccount, verifyStatus, users, deleteUser }}>
                {children}
            </verifyContext.Provider>
        </>
    )
}

export default VerifyContextProvider