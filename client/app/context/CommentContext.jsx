import { createContext } from "react";
export const Commentcontext = createContext();
import { useSelector } from "react-redux";
import axios from "axios";

const CommentContextProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
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
    return (
        <Commentcontext.Provider
        value={
          { AddComment }
        }
        >
            {children}
        </Commentcontext.Provider>
    )
}

export default CommentContextProvider ;