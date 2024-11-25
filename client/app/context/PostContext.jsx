'use client'
import {createContext, useState , useEffect } from "react";
import { useSelector } from "react-redux";
export const Postcontext = createContext();
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PostContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    const [ posts , setPosts ] = useState([])
    const [loading, setLoading] = useState(false)
    // Delete Post
    const deletePost = (PostId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/api/post/${PostId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user?.token}`
                        }
                    })
                        .then((res) => {
                            if (res.status === 200) {
                                window.location.reload()
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            });
    }
    // Pin Post In top when Click On pin option
    const pinTrend = (id) => {
        axios.put(`http://localhost:3001/api/post/pin/${id}` , {} ,{
            headers: {
                // "Content-Type": "application/json",
                Authorization : `Bearer ${user.token}`
            }
        })
            .then(res => {
                // if (res.status === 200) {
                    toast.success("Post has been Pind")
                    // window.location.reload()
                    console.log(res.data)
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const unPinPost = (id) => {
        axios.put(`http://localhost:3001/api/post/unpin/${id}` , {} ,{
            headers: {
                // "Content-Type": "application/json",
                Authorization : `Bearer ${user.token}`
            }
        })
            .then(res => {
                // if (res.status === 200) {
                    toast.success("Post has been Unpind")
                    // window.location.reload()
                    console.log(res.data)
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get("http://localhost:3001/api/post")
        .then(res => {
            setPosts(res.data)
            setLoading(true)
        })
        .catch(err => {
            console.log(err)
        })
    }, [posts])
    return (
        <>
            <ToastContainer/>    
            <Postcontext.Provider
            value={
            { deletePost , posts , loading , pinTrend , unPinPost}
            }
            >
                {children}
            </Postcontext.Provider>
        </>
    )
}

export default PostContextProvider ;