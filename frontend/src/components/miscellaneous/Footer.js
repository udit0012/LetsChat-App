import React from 'react';
import facebook from "../images/facebook.png"
import instagram from "../images/instagram.png"
import twitter from "../images/twitter.png"
import linkedin from "../images/linkedin.png"
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
    return <div className='footer disflex' style={{flexDirection:"column", height:isMobile?"30vh": "60vh" }}>
        <div style={{width:"90%",margin:isMobile?"2em":"3em"}}>
            {!isMobile && <><div className='registerInput' style={{ border: "1px solid white" }}>
                <input className='RegInput' style={{ width: "90%" }} type="text" placeholder='Email or Phone no.' name="emailphone" />
                <span className="material-icons disflex" style={{ color: "white", justifyContent: 'flex-end', margin: "0 1em" }}>arrow_forward</span>
            </div>
            <div className='disflex' style={{justifyContent:"flex-start",margin:"1em 0"}}>
                <button className='lbtn'>Features</button>
                <button className='lbtn'>LetsChat</button>
                <button className='lbtn'>Blog</button>
                <button className='lbtn'>Servics</button>
            </div></>}
            <div className='disflex' style={{justifyContent:isMobile?"center":"flex-start"}}>
                <Link className='icon-btn' to="/" style={{border:"1px solid white"}}><img src={facebook} alt="" /></Link>
                <Link className='icon-btn' to="/" style={{border:"1px solid white"}}><img src={instagram} alt="" /></Link>
                <Link className='icon-btn' to="/" style={{border:"1px solid white"}}><img src={twitter} alt="" /></Link>
                <Link className='icon-btn' to="/" style={{border:"1px solid white"}}><img src={linkedin} alt="" /></Link>
            </div>
        </div>
        <hr style={{width:"100%"}}/>
        <div style={{width:"90%",margin:isMobile?"2em":"3em"}}>
            <div>
                <div className='logoname'>LetsChat</div>
            </div>
            <div className='disflex' style={{justifyContent:"flex-start",margin:"1em 0"}}>
                <button className='lbtn' style={{width:isMobile?"20%":"",fontSize:isMobile?".8rem":""}}>Terms</button>
                <button className='lbtn' style={{width:isMobile?"20%":"",fontSize:isMobile?".8rem":""}}>About</button>
                <button className='lbtn' style={{width:isMobile?"20%":"",fontSize:isMobile?".8rem":""}}>Privacy</button>
                <button className='lbtn' style={{width:isMobile?"20%":"",fontSize:isMobile?".8rem":""}}>Contact</button>
            </div>
            <div className='disflex' style={{justifyContent:"flex-start",fontSize:isMobile?".8rem":""}}>
                @me_gotnochillz © 2022. All Rights Reserved.
            </div>
        </div>
    </div>;
};

export default Footer;
