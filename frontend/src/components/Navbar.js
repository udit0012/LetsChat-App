import React, { useContext, useState } from 'react';
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import NoteContext from '../context/Notecontext';
import UserProfile from './Dialogboxes/UserProfile';
import { getSender } from './config/ChatLogic';

const Navbar = () => {
    const navigate = useNavigate()
    const appcolor = "black"
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [opendialog, setOpendialog] = useState(false);
    const [menu, setMenu] = useState(false);
    const d = new Date()
    const { user, logout, notification, setNotification, setSelectedchat } = useContext(NoteContext);
    const onClose = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        } else {
            setOpendialog(!opendialog)
        }
    }
    return (
        <>
            <div className={styles.Navbar}>
                <Link to="/" className={styles.logoname}>
                    Lets Chat
                </Link>
                <div className={styles.nav_btns}>
                    {!localStorage.getItem("token") && <Link className={styles.nav_btn} to="/register">Sign up for free</Link>}
                    {!localStorage.getItem("token") && <Link className={styles.nav_btnOutline} to="/login">Sign in</Link>}
                    {localStorage.getItem("token") && <Link className={styles.nav_usericon} to="/">
                            <i class="fa fa-user" aria-hidden="true"></i><div className={styles.nav_username}>{user.username}</div>
                    </Link>}
                </div>
                {localStorage.getItem("token") && <UserProfile open={opendialog} close={onClose} user={user} />}
            </div>
        </>
    );
};

export default Navbar;
