import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Auth.module.css"

import NoteContext from "../../context/Notecontext.js";
import Footer from '../miscellaneous/Footer';

const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ emailphone: "", password: "" })
  const { showAlert, fetchuserdata, link } = useContext(NoteContext)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

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
      if (localStorage.getItem("token")) {
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
    <>
      <div className={styles.Auth_page}>
        <div className={styles.Auth_box}>
          <form className={styles.Auth_form} autoComplete='off' action="post" onSubmit={HandleOnSubmit}>
            <div className={styles.form_head}>Login To Your Account</div>
            <div className={styles.form_label}><label htmlFor="#email">Email Address</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-user'></i><input className={styles.form_input} type="text" id='email' placeholder='Email or Phone no.' name="emailphone" onChange={onChange} value={credentials.emailphone} /></div>
            <div className={styles.form_label}><label htmlFor="#password">Password</label></div>
            <div className={styles.form_field}><i className='fa-solid fa-unlock-keyhole'></i><input className={styles.form_input} type="password" id='password' placeholder='Password' name="password" onChange={onChange} value={credentials.password} /></div>
            <div className={styles.form_link}>Don't have account? <Link to="/register">Sign up</Link></div>
            <button className={styles.form_btn} type='submit' >Login</button>
          </form>
        </div>
      </div>
      {isMobile && <Footer />}
    </>
  )
};

export default Login;

