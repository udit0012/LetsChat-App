import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from './UserProfile.module.css'

const UserProfile = ({user,open,close}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const appcolor = "black"
    return (
         <div className={styles.dialog} style={{zIndex: "20", display: open ? "block" : "none" }}>
            <div className={styles.dialogbox}>
                <div className={styles.dialog_header} >
                    <button className={styles.usericon} onClick={close}><span className='material-icons'>close</span></button>
                    <div className={styles.dialog_headername}>Contact Info</div>
                </div>
                {localStorage.getItem("user") &&<div className={styles.userdetails}>
                        <img className={styles.userimg} src={user.pic} alt="" />
                        <div className={styles.username} style={{textTransform:"capitalize"}}> {user.username}</div>
                        <div className={styles.detail}> {user.email}</div>
                        <div className={styles.detail}> {user.phoneno}</div>
                </div>}
            </div>
        </div>
    )
}

export default UserProfile
