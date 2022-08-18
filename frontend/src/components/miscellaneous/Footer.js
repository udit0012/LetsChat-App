import React from 'react';
import styles from "./Footer.module.css"
import facebook from "../images/facebook.png"
import instagram from "../images/instagram.png"
import twitter from "../images/twitter.png"
import linkedin from "../images/linkedin.png"
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    return <div className={styles.footer}>
        <div className={styles.footer_cont1}>
            <div className={styles.footer_info}>
                <div className={styles.footer_heading1}>
                    Lets Chat
                </div>
                <div className={styles.footer_text}>Make amazing things happen together at home, office and school.</div>
            </div>
            <div className={styles.footer_links}>
                <div className={styles.footer_heading2}>
                    Navigation
                </div>
                <ul className={styles.footer_list}>
                    <li><button className={styles.footer_btn}>Home</button></li>
                    <li><button className={styles.footer_btn}>Chat</button></li>
                    <li> <button className={styles.footer_btn}>Contact</button></li>
                    <li><button className={styles.footer_btn}>Notification</button></li>
                    <li> <button className={styles.footer_btn}>Calendar</button></li>
                    <li><button className={styles.footer_btn}>Settings</button></li>
                </ul>
            </div>
            <div className={styles.footer_links}>
                <div className={styles.footer_heading2}>
                    Useful Links
                </div>
                <ul className={styles.footer_list}>
                    <li><button className={styles.footer_btn}>Register</button></li>
                    <li><button className={styles.footer_btn}>Login</button></li>
                    <li><button className={styles.footer_btn}>Policy</button></li>
                    <li><button className={styles.footer_btn}>Terms & Conditions</button></li>
                </ul>
            </div>
            <div className={styles.footer_links}>
                <div className={styles.footer_heading2}>
                    Features
                </div>
                <div className={styles.features}>
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                    <img className={styles.feat_img} src="/favicon.png" alt="" />
                </div>
            </div>
        </div>
        <div className={styles.footer_cont2}>
            <div className={styles.footer_copyright}>
                Copyright ©2022 All rights reserved &nbsp; | &nbsp; This application is made by <span className={styles.footer_name}>Udit goyal</span>
            </div>
            <div className='disflex' style={{ justifyContent: "flex-start", margin: "1em 0" }}>
                <div className={styles.footer_follow}>Follow me</div>
                <div className={styles.horizontal_line}></div>
                <Link target="_blank" to="https://www.instagram.com/me_gotnochillz/" className={styles.footer_icons}><i class="fa fa-instagram" aria-hidden="true"></i></Link>
                <Link target="_blank" to="https://github.com/udit0012" className={styles.footer_icons}><i class="fa fa-github" aria-hidden="true"></i></Link>
                <Link target="_blank" to="https://www.facebook.com/profile.php?id=100011128845610" className={styles.footer_icons}><i class="fa fa-facebook" aria-hidden="true"></i></Link>
                <Link target="_blank" to="https://twitter.com/uditgoyal0012" className={styles.footer_icons}><i class="fa fa-twitter" aria-hidden="true"></i></Link>
            </div>
        </div>
    </div>;
};

export default Footer;
