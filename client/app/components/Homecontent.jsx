'use client'
import React, { useEffect  , useState} from 'react'
import Header from "./Header";
import BottomSide from "./BottomSide";
import Leftsidebar from "./leftsidebar";
import { Provider } from 'react-redux';
import store from '../redux/Store';
import Login from './Login';
import Register from './Register';
import LikeContextProvider from '../context/LikeContext';
import CommentContextProvider  from '../context/CommentContext';
import PostContextProvider from '../context/PostContext';
import VerifyContextProvider from '../context/VerifyContext';
const Homecontent = ({ children }) => {
    const [open, setOpen] = React.useState(false)
    const [title, setTitle] = useState("Home")
  const [display, setDisplay] = useState(false)
  const [login, setLogin] = useState(false)
  const [register , setRegister] = useState(false)
  useEffect(() => {
    if(window.location.href === "http://localhost:3000/pages/dashboard" || window.location.href === "http://localhost:3000/pages/dashboard/pages/user" || window.location.href === "http://localhost:3000/pages/dashboard/pages/posts" || window.location.href === "http://localhost:3000/pages/dashboard/pages/comments") {
      setDisplay(true)
    }
    else {
      setDisplay(false)
    }
  }, [])
  return (
    <div>
      <Provider store={store}>
        <CommentContextProvider>
          <LikeContextProvider>
            <PostContextProvider>
              <VerifyContextProvider>
                  <div className={`${open ? "" : ""}`}>
                    <Header title={title} setLogin={setLogin} login={login} setRegister={setRegister} Register={register} />
                    <Login login={login} setLogin={setLogin} register={register} setRegister={setRegister} />
                    <Register register={register} setRegister={setRegister} setLogin={setLogin} login={login} />
                    <Leftsidebar setOpen={setOpen} open={open} display={display}/>
                    {children}
                    <BottomSide setOpen={setOpen} open={open} />
                  </div>
              </VerifyContextProvider>
            </PostContextProvider>
          </LikeContextProvider>
        </CommentContextProvider >
      </Provider>
    </div>
  )
}

export default Homecontent