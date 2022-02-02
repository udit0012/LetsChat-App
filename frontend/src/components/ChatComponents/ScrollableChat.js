import React, { useContext } from 'react';
import ScrollableFeed from "react-scrollable-feed";
import NoteContext from '../../context/Notecontext';
import { isFirstMessage, isSamesender } from '../config/ChatLogic';
import TypingLoader from '../loaders/TypingLoader';
const ScrollableChat = ({ messages, typing,room }) => {
    const { user, selectedchat } = useContext(NoteContext)
    return (<ScrollableFeed>
        {messages.map((m, i) => {
            return (<div key={m._id} className={`msg ${m.sender._id === user._id ? "msgsent" : "msgreceive"}`}>
                <div className='msgText' style={{ maxWidth: "60%", wordBreak: "break-word" }}>{selectedchat.isGroupchat && (isSamesender(messages, m, i, user._id) || isFirstMessage(messages, i, user._id)) && <div className='sendername'>{m.sender.username}</div>}{m.content}</div>
            </div>)
        })}
        {(selectedchat._id===room._id)?<>{typing && <div className="msg msgreceive"><span className='msgText' style={{ padding: ".2em .4em" }}><TypingLoader /></span></div>}</>:""}
    </ScrollableFeed>);
};

export default ScrollableChat;
{/* <div className='msg msgreceive'><span className='msgText'>Hello</span></div>
                    <div className='msg msgsent'><span className='msgText'>Hi</span></div> */}