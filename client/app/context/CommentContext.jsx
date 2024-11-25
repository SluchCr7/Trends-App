'use client'
import { createContext } from "react";
export const Commentcontext = createContext();
import { useSelector } from "react-redux";
import axios from "axios";
import { useState , useEffect} from "react";
const CommentContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    const [Comments , setComments] = useState([])
    const AddComment = (id , textcomment , setComment) => {
      if (!textcomment) {
        toast.error("Comment can't be empty")
      }
      else{
        axios.post(`http://localhost:3001/api/comment`, {
          content: textcomment,
          postId : id
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        }).then(res => {
          console.log(res.data)
          // toast.success("Comment Added")
          // setTextComment("")
          setComment(false)
        })
        .catch(err => {
          console.log(err)
          // toast.error("Something went wrong")
        })
      }
    }
    useEffect(() => {
        axios.get("http://localhost:3001/api/comment")
            .then(res => {
                setComments(res.data)
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [Comments])
    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/api/comment/${id}`, {
        headers: {
            Authorization : `Bearer ${user.token}`
        }
        })
        .then((res) => {
            console.log("deleted Succesfully")
            window.location.reload()
        })
        .catch(err=> console.log(err))
    }
    return (
        <Commentcontext.Provider
        value={
          { AddComment  , Comments , deleteComment}
        }
        >
            {children}
        </Commentcontext.Provider>
    )
}

export default CommentContextProvider ;