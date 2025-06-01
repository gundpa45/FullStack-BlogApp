import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from './components/Profile'
import Otp from "./components/Otp"
import Create from "./components/Create"
import GetAllBlogs from "./components/GetAllBlogs"
import Edits from "./components/Edits"
import Searchfilter from "./components/Searchfilter"
import SearchResult from "./components/SearchResult"
import BlogDetails from "./components/BlogDetails"


import OtpForgotPassword from "./components/pages/OtpForgotPassword"
import { UpdatePassword } from "./components/pages/UpdatePassword"
import { useEffect, useState } from "react"
import FortgotPassword from "./components/pages/FortgetPassword"

function App() {
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    
    
    
   useEffect( () => {
    const token = localStorage.getItem("authToken")
    if(token){
      setIsLoggedIn(true)
    }
   },[])

   
  //  console.log("App.jsx",isLoggedIn);  
   
  return (
    <>
    <Searchfilter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      
      <Route path="/" element={<GetAllBlogs/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="/profile" element={<Profile  />} />
      <Route path="/verifyOtp" element={<Otp/>} />
      <Route path="/createblog" element={<Create/>} />
      <Route path="/updateBlog/:blogId" element={<Edits/>} />
      <Route path="/search" element={<SearchResult/>} />
      <Route path="/blog/:id" element={<BlogDetails/>} />
      <Route path="/forgotpassword" element={<FortgotPassword/>} />
      <Route path="verifyotpforgotpassword" element={<OtpForgotPassword/>} />
      <Route path="/updatepassword" element={<UpdatePassword/>}/>

    </Routes>
    </>
  )
}

export default App
