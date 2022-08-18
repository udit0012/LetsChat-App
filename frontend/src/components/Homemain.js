import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import NoteContext from '../context/Notecontext';
import messaging from "./images/messaging.png"
import styles from "./Homemain.module.css"

const Homemain = () => {
    const { setCheckbutton } = useContext(NoteContext)

    return <div className={styles.home_container} >
        <div className={styles.home_box}>
            <div className={styles.home_info}>
                <div className={styles.home_heading}>
                   Lets Chat
                </div>
               <div className={styles.home_text}>Make amazing things happen together at home, office and school.</div>
                <div>
                    <Link to={localStorage.getItem('token') ? "/LetsChat" : "/login"} className={styles.home_btn}>Chat with friends</Link>
                </div>
            </div>
            <div className={styles.home_img_box}>
                <img className={styles.home_img} src='/messaging.svg' alt="" />
            </div>
        </div>
    </div>;
};

export default Homemain;
