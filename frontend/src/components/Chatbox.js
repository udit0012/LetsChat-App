import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../context/Notecontext';
import MessageBox from './ChatComponents/Messagebox';

const Chatbox = ({fetchagain,setFetchagain}) => {
    const appcolor = "black"
    const {selectedchat} = useContext(NoteContext)
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

    return <div className='w100 h100 disflex' style={{justifyContent:"flex-start",alignItems:isMobile?"flex-start":"center", backgroundColor: appcolor, display: isMobile ? selectedchat ? "flex" : "none" : "flex",borderTop:isMobile?"":"1px solid white" }}>
            <MessageBox />
    </div>
};

export default Chatbox;
