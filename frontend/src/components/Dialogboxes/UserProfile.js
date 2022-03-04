import React from 'react'
import { useMediaQuery } from 'react-responsive'

const UserProfile = ({user,open,close}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const appcolor = "black"
    return (
         <div className="dialog" style={{position:"absolute",left:"0",zIndex: "20", display: open ? "block" : "none" }}>
            <div className="dialogbox">
                <div className="disflex" style={{ padding: ".4em", justifyContent: "space-between" }} >
                    <div className='logoname' style={{ marginLeft: ".5em", color: appcolor, fontSize:isMobile?"2rem": "2.5rem" }}>User profile</div>
                    <button className='usericon closeicon' onClick={close} style={{ padding: ".3em" }}><span className='material-icons' style={{ color: appcolor }}>close</span></button>
                </div>
                <hr />
                {localStorage.getItem("user") &&<div className='userdetails disflex' style={{flexDirection:"column",marginBottom:"1em"}}>
                        <img style={{ width:isMobile?"30%" :"20%", height:isMobile?"30%" :"20%", borderRadius: "50%" }} src={user.pic} alt="" />
                        <div className='detail name' style={{textTransform:"capitalize"}}> {user.username}</div>
                        <div className='detail'> {user.email}</div>
                        <div className='detail'> {user.phoneno}</div>
                </div>}
            </div>
        </div>
    )
}

export default UserProfile
