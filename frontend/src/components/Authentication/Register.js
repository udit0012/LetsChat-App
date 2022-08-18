import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import VideoCall from "../images/messaging.png"
import NoteContext from '../../context/Notecontext';
import Footer from '../miscellaneous/Footer';
import styles from "./Auth.module.css"

const Register = () => {
  const navigate = useNavigate()
  const appcolor = "black"
  const { fetchuserdata, link, showAlert } = useContext(NoteContext);
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const [credentials, setCredentials] = useState({ username: "", phoneno: "", email: "", password: "" })
  const { username, phoneno, email, password } = credentials
  const HandleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${link}/LetsChatApi/auth/register`, {
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
      if (localStorage.getItem("token")) {
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
    <>
      <div className={styles.Auth_page}>
        <div className={styles.Auth_box}>
          <form className={styles.Auth_form} autoComplete='off' action="post" onSubmit={HandleOnSubmit}>
            <div className={styles.form_head}>Create your Account</div>
            <div className={styles.form_label}><label htmlFor="#Username">Username</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-user'></i><input className={styles.form_input} type="text" id='Username' placeholder='Username' name="username" onChange={onChange} minLength={3} required /></div>
            <div className={styles.form_label}><label htmlFor="#Phone">Phone Number</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-user'></i><input className={styles.form_input} type="phone" id='Phone' placeholder='Phone no.' name="phoneno" onChange={onChange} required /></div>
            <div className={styles.form_label}><label htmlFor="#email">Email Address</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-user'></i><input className={styles.form_input} type="email" id='email' placeholder='Email' name="email" onChange={onChange} required /></div>
            <div className={styles.form_label}><label htmlFor="#password">Password</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-user'></i><input className={styles.form_input} type="password" id='password' placeholder='Create Password' name="password" onChange={onChange} minLength={6} required /></div>
            <div className={styles.form_link}>I already have account! <Link to="/login">Sign in</Link></div>
            <button className={styles.form_btn} type='submit'>Register</button>
          </form>
        </div>
      </div>
      {isMobile && <Footer />}
    </>
  )
};

export default Register;
