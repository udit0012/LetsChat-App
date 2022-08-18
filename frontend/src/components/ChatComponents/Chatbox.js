import React, { useContext, useState } from 'react';
import styles from './ChatList.module.css'
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import MessageBox from './MessageBox/Messagebox';

const Chatbox = () => {
    const appcolor = "black"
    const {selectedchat} = useContext(NoteContext)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return <div className={styles.chatbox} style={{ display: isMobile ? selectedchat ? "flex" : "none" : "flex" }}>
            <MessageBox />
    </div>
};

export default Chatbox;
