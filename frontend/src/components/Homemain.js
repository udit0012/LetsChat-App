import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import NoteContext from '../context/Notecontext';
import messaging from "./images/messaging.png"

const Homemain = () => {
    const { setCheckbutton } = useContext(NoteContext)
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const istablet = useMediaQuery({ query: "(max-width:1224px" })
    const appcolor = "black"
    const lightappcolor = "#999999"

    return <div className='w100 disflex' style={{
        height: "70vh",
        backgroundColor: lightappcolor,
    }}>
        <div className='disflex' style={{
            width: isMobile ? "100%" : istablet ? "80%" : "55%",
            height: "70%",
            flexFlow: isMobile ? "column-reverse" : "row",
        }}>
            <div className='w100'>
                {!isMobile && <div style={{ width: "60%", fontFamily: "'PT Sans Narrow', sans-serif", fontSize: istablet ? "2rem" : "3rem", fontWeight: "normal" }}>
                    <div>Be together</div>
                    <div>in the moment</div>
                    <div>with Lets Chat</div>
                </div>}
                {isMobile && <div className='w100 disflex' style={{ marginTop: "1em", marginBottom: ".5em", fontFamily: "'PT Sans Narrow', sans-serif", fontSize: "1.4rem", fontWeight: "normal" }}>
                    Be together in the moment with Lets Chat
                </div>}
                {!isMobile && <div style={{ marginTop: ".5em", marginRight: "1em" }}>Lets Chat is the real time messaging app. It’s free, simple and works on Android phones, iPhones, tablets, computers, and smart displays, like the Google Nest Hub Max.</div>}
                <div style={{ display: "flex", flexFlow: isMobile ? "row" : "column", justifyContent: isMobile ? "center" : "start", marginTop: ".7em" }}>
                    <Link to={localStorage.getItem('token') ? "/ChatWithFriends" : "/login"} className='lbtn disflex'
                        onClick={() => { setCheckbutton("chat") }} style={{ backgroundColor: appcolor, width: "40%", fontSize: isMobile ? ".8rem" : istablet ? "1rem" : "1.2rem" }}>Chat with friends</Link>
                </div>
            </div>
            <div className='w100' style={{ marginLeft: "1em" }}>
                <img style={{ width: "96%" }} src={messaging} alt="" />
            </div>
        </div>
    </div>;
};

export default Homemain;
