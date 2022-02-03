import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import VideoCall from "../images/messaging.png"
import NoteContext from '../../context/Notecontext';

const Register = () => {
  const navigate = useNavigate()
  const appcolor = "black"
  const { fetchuserdata, showAlert } = useContext(NoteContext);
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const [credentials, setCredentials] = useState({ username: "", phoneno: "", email: "", password: "" })
  const { username, phoneno, email, password } = credentials
  const HandleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("https://letschat-react-app.herokuapp.com/LetsChatApi/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ username, phoneno, email, password })
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      fetchuserdata()
      showAlert("Registered successfully", "success")
      if(localStorage.getItem("token")){
        navigate("/LetsChat")
      }
    }
    else {
      showAlert(json.error, "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ width: "100vw", height: "100vh", fontFamily: "'PT Sans Narrow', sans-serif" }}>
      <div style={{ display: "flex" }}>
        <Link to="/" className='logoname disflex' style={{ width: "100%", color: appcolor, marginLeft: ".4em" }}>Lets Chat</Link>
        <div className='disflex reglogbtn' style={{ width: "100%", justifyContent: isMobile ? "end" : "center", marginRight: ".4em" }}><Link className='lbtn lbtnOutline ' to="/login">Login</Link></div>
      </div>
      <div className="RegLegContainer" style={{
        backgroundColor: appcolor
      }}>
        <div className='RegLegBox'>
          <form className='RegLegForm' style={{ transform: isMobile ? "skewX(0deg)" : "skewX(20deg)" }} autoComplete='off' action="post" onSubmit={HandleOnSubmit}>
            <div className='logoname' style={{ color: appcolor }}>Lets Chat</div>
            <div className='formsubhead'>Create your Account</div>
            <div className='registerInput'><input className='RegInput' type="text" placeholder='Username' name="username" onChange={onChange} minLength={3} required /></div>
            <div className='registerInput'><input className='RegInput' type="phone" placeholder='Phone no.' name="phoneno" onChange={onChange} required /></div>
            <div className='registerInput'><input className='RegInput' type="email" placeholder='Email' name="email" onChange={onChange} required /></div>
            <div className='registerInput'><input className='RegInput' type="password" placeholder='Create Password' name="password" onChange={onChange} minLength={6} required /></div>
            {/* <div className='registerInput'><input className='RegInput' type="file" accept='images/*' placeholder='Uplaod a Photo' name="Photo" onChange={(e) => postdetails(e.target.files[0])} /></div> */}
            <Link to="/login" style={{ color: "black", display: "block", fontSize: "1.1rem" }}>Already registered? Login</Link>
            <button className='lbtn submitbtn w100' type='submit'>Register</button>
          </form>
        </div>

        {!isMobile && <div className='RegLegImage'>
          <img style={{ width: istablet ? "200%" : "100%", marginRight: "2em" }} src={VideoCall} alt="" />
        </div>}
      </div>
    </div>
  )
};

export default Register;
