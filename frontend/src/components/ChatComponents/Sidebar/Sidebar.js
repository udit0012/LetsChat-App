import React, { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link,useLocation } from 'react-router-dom'
import NoteContext from '../../../context/Notecontext'
import styles from './Sidebar.module.css'

const Sidebar = ({opengroupmodal,groupmodal}) => {
    const location = useLocation()
    const isTablet = useMediaQuery({query:"(max-width:1268px)"})
    const isMobile = useMediaQuery({query:"(max-width:768px)"})
    const [display, setDisplay] = useState(false)
    const {selectedchat,searchSideBar,logout,user} = useContext(NoteContext)

    const active1 = {
        borderLeft : "4px solid #ace6e9",
    }
    const active2 = {
        color:"#ace6e9",
    }

    const displaysideBar=()=>{
        setDisplay(!display)
    }
    return (
        <div className={styles.sidebar} style={isTablet ? {left:display?'0':isMobile?"-13rem":"-16rem"}:{}}>
            <button className={styles.sidebar_menubtn} style={{display:(selectedchat||searchSideBar)?"none":"flex"}} onClick={displaysideBar}><i className="fa fa-bars" aria-hidden="true"></i></button>
            <div className={styles.sidebar_container}>
                <div>
                    <div className={styles.imgbox}>
                        <img className={styles.profileimg} src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="" />
                        <div className={styles.username}>{user.username}</div>
                        <div className={styles.phoneno}>{user.phoneno}</div>
                    </div>
                    <ul className={styles.sidebar_options}>
                        <li className={styles.sidebar_option} style={(location.pathname==="/"&!groupmodal)?active1:{}}>
                            <Link className={styles.sidebar_link} onClick={opengroupmodal} to="/" style={location.pathname==="/"&!groupmodal?active2:{}}>
                                <span className='material-icons'>home</span>
                                Home
                            </Link>
                        </li>
                        <li className={styles.sidebar_option} style={location.pathname==="/LetsChat"&!groupmodal?active1:{}}>
                            <Link className={styles.sidebar_link} onClick={opengroupmodal} to="/LetsChat" style={location.pathname==="/LetsChat"&!groupmodal?active2:{}}>
                                <span className='material-icons'>chat</span>
                                Chat
                            </Link>
                        </li>
                        <li className={styles.sidebar_option} >
                            <Link className={styles.sidebar_link} onClick={opengroupmodal} to="/LetsChat">
                                <span className='material-icons'>perm_identity</span>
                                Contact
                            </Link>
                        </li>
                        <li className={styles.sidebar_option}  style={groupmodal?active1:{}}>
                            <Link className={styles.sidebar_link} to="/LetsChat" onClick={opengroupmodal} style={groupmodal?active2:{}} >
                                <span className='material-icons'>people_alt</span>
                                Create Group
                            </Link>
                        </li>
                        <li className={styles.sidebar_option}>
                            <Link className={styles.sidebar_link} onClick={opengroupmodal} to="/LetsChat">
                                <span className='material-icons'>event</span>
                                Calendar
                            </Link>
                        </li>
                        <li className={styles.sidebar_option}>
                            <Link className={styles.sidebar_link} onClick={opengroupmodal} to="/LetsChat">
                                <span className='material-icons'>settings</span>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.logout}>
                    <Link className={styles.sidebar_link} onClick={logout} to="/">
                        <span className="material-icons">power_settings_new</span>
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
