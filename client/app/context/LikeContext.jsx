import React, { createContext } from 'react'
export const likeContext = createContext();
import { useSelector } from 'react-redux';
import axios from 'axios';
const LikeContextProvider = (props) => {
    const { user } = useSelector((state) => state.auth)
    const HandleLike = (id) => {
        axios.put(`http://localhost:3001/api/post/like/${id}`,
            {},
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
            .then((res) => {
                console.log(res.data)
                
            })
            .catch((err) => {
                console.log(err)
        })
    }
    const handleLikeComment = (CommentId) => {
        axios.put(`http://localhost:3001/api/comment/like/${CommentId}` , {},{headers : {Authorization : `Bearer ${user.token}`}})
        .then(res => {  
        })
        .catch(err => {
          console.log(err)
        })
    }
    return (
        <>        
            <likeContext.Provider value={{
                HandleLike , handleLikeComment
            }}>
                {props.children}
            </likeContext.Provider>
        </>
  )
}

export default LikeContextProvider ;