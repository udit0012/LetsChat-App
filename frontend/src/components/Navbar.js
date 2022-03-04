import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import NoteContext from '../context/Notecontext';
import UserProfile from './Dialogboxes/UserProfile';
import { getSender } from './config/ChatLogic';
import NotificationBadge, { Effect } from "react-notification-badge"

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
            <div className="Navbar w100" style={{ backgroundColor: appcolor }}>
                {!isMobile && <div className="w100 disflex">
                    <div className="h100 disflex" style={{ fontSize: "1.4rem", color: "white", marginRight: ".2em", cursor: "default", fontFamily: "'PT Sans Narrow', sans-serif", fontWeight: "bold" }}>
                        <span style={{ padding: "0 .2em" }}>{d.toLocaleTimeString('en-US', {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric"
                        })}</span>
                        <span className="material-icons" style={{ "fontSize": "5px", margin: "0 .2em" }}>
                            fiber_manual_record
                        </span>
                        <span>{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>}
                <Link to="/" className="logoname w100 h100 disflex" style={{ justifyContent: isMobile ? "start" : "center", marginLeft: isMobile ? ".5em" : "0" }}>
                    <span className="logoname" style={{ color: "white" }}>Lets Chat</span>
                </Link>
                <div className="w100 h100 disflex" style={{ justifyContent: isMobile ? "end" : "center", marginRight: isMobile ? ".7em" : "2.5em", color: "white" }}>
                    {!isMobile && <button className="usericon" onClick={onClose}>
                        <img className='profileimg' style={{ position: "relative" }} src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                    </button>}
                    {!isMobile && localStorage.getItem("token") && <div className="" style={{ marginRight: ".5em", position: "relative" }}>
                        <NotificationBadge count={notification.length} effect={Effect.SCALE} />
                        <span onClick={() => { setMenu(!menu) }} className='material-icons-outlined' style={{ fontSize: isMobile ? "1.7rem" : "2.5rem", cursor: "pointer" }}>notifications</span>
                        <div className='menubox disflex' style={{ flexDirection: "column-reverse", display: menu ? "flex" : "none", fontSize: "1.3rem", left: "-200px", boxShadow: "5px 5px 20px black", width: "200px", color: appcolor, padding: ".3em 0.7em" }}>
                            {!notification.length && "No new message"}
                            {notification.map((notif) => {
                                return <div onClick={() => {
                                    setSelectedchat(notif.chat);
                                    setNotification(notification.filter((n) => n !== notif))
                                }} style={{ cursor: "pointer", width: '100%', borderBottom: "1px solid #999999", padding: ".2em", textTransform: "capitalize" }}>{notif.chat.isGroupchat ? notif.chat.chatname : getSender(user, notif.chat.users).username}</div>
                            })}
                        </div>
                    </div>}
                    {!localStorage.getItem("token") && <Link className="login lbtn" style={{ color: appcolor, backgroundColor: "white" }} to="/register">Register</Link>}
                    {localStorage.getItem("token") && <button className="login lbtn" style={{ color: appcolor, backgroundColor: "white" }} onClick={logout}>Logout</button>}
                </div>
                {localStorage.getItem("token") && <UserProfile open={opendialog} close={onClose} user={user} />}
            </div>
        </>
    );
};

export default Navbar;
