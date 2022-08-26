import React, { useContext } from 'react';
import ScrollableFeed from "react-scrollable-feed";
import styles from './ScrollableChat.module.css'
import NoteContext from '../../../context/Notecontext';
import { isFirstMessage, isSamesender } from '../../config/ChatLogic';
import TypingLoader from '../../loaders/TypingLoader';
const ScrollableChat = ({ messages, typing,room }) => {
    const { user, selectedchat } = useContext(NoteContext)
    return (<ScrollableFeed className={styles.scrollable_feed}>
        {messages.map((m, i) => {
            return (<div key={m._id} className={m.sender._id === user._id ? styles.msg_sent : styles.msg_recieve}>
                <div className={m.sender._id === user._id ?styles.msgsent_text:styles.msgrecieve_text} >{selectedchat.isGroupchat && (isSamesender(messages, m, i, user._id) || isFirstMessage(messages, i, user._id)) && <div className={styles.msg_senderName}>{m.sender.username}</div>}{m.content}</div>
            </div>)
        })}
        {(selectedchat._id===room._id)?<>{typing && <div className={styles.msg_recieve}><span className={styles.msgrecieve_text}><TypingLoader /></span></div>}</>:""}
    </ScrollableFeed>);
};

export default ScrollableChat;