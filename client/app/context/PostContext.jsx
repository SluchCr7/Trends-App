import {createContext } from "react";
import { useSelector } from "react-redux";
export const Postcontext = createContext();
import axios from "axios";
import swal from "sweetalert";
const PostContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
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
                        "Authorization" : `Bearer ${user?.token}`
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
    return (
        <Postcontext.Provider
        value={
        { deletePost}
        }
        >
            {children}
        </Postcontext.Provider>
    )
}

export default PostContextProvider ;