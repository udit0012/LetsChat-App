import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import VideoCall from "../images/messaging.png"
import NoteContext from "../../context/Notecontext.js";

const Login = () => {
  const navigate = useNavigate()
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const [credentials, setCredentials] = useState({ emailphone: "", password: "" })
  const { showAlert, fetchuserdata,link } = useContext(NoteContext)
  const appcolor = "black"
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  const HandleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${link}/LetsChatApi/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ emailphone: credentials.emailphone, password: credentials.password })
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      fetchuserdata();
      if(localStorage.getItem("token")){
        navigate("/LetsChat")
      }
      showAlert("Login successfully", "success")
    }
    else {
      showAlert('Invalid credentials', "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ width: "100vw", height: "100vh", fontFamily: "'PT Sans Narrow', sans-serif" }}>
      <div style={{ display: "flex" }}>
        <Link to="/" className='logoname disflex' style={{ width: "100%", color: appcolor, marginLeft: ".4em" }}>Lets Chat</Link>
        <div className='disflex reglogbtn' style={{ width: "100%", justifyContent: isMobile ? "end" : "center", marginRight: ".4em" }}><Link className='lbtn lbtnOutline ' to="/register">Register</Link></div>
      </div>
      <div className="RegLegContainer" style={{
        backgroundColor: appcolor
      }}>
        <div className='RegLegBox'>
          <form className='RegLegForm loginform' style={{ transform: isMobile ? "skewX(0deg)" : "skewX(20deg)" }} autoComplete='off' action="post" onSubmit={HandleOnSubmit}>
            <div className='logoname' style={{ color: appcolor }}>Lets Chat</div>
            <div className='formsubhead'>Login to your Account</div>
            <div className='registerInput'><input className='RegInput' type="text" placeholder='Email or Phone no.' name="emailphone" onChange={onChange} value={credentials.emailphone} /></div>
            <div className='registerInput'><input className='RegInput' type="password" placeholder='Password' name="password" onChange={onChange} value={credentials.password} /></div>
            <Link to="/register" style={{ color: "black", display: "block", fontSize: "1.1rem" }}>Create an account</Link>
            <button className='lbtn submitbtn w100' type='submit' >Login</button>
          </form>
        </div>

        {!isMobile && <div className='RegLegImage'>
          <img style={{ width: istablet ? "200%" : "100%", marginRight: "2em" }} src={VideoCall} alt="" />
        </div>}
      </div>
    </div>
  )
};

export default Login;

