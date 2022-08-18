import React, { useContext, useState } from 'react';
import Spinner from '../components/loaders/Spinner';
import styles from '../components/ChatComponents/Sidebar/Sidebar.module.css'
import ChatContainer from '../components/ChatComponents/ChatContainer';
import Sidebar from '../components/ChatComponents/Sidebar/Sidebar';
import NoteContext from '../context/Notecontext';

const ChatPage = () => {
    const {user} = useContext(NoteContext)
    const [groupmodal, setGroupmodal] = useState(false);

    const opengroupmodal = () => {
        setGroupmodal(!groupmodal)
      }
    return <div className={styles.chatPage}>
        
        {user ? <>
            <div className={styles.chat_container}>
                <Sidebar groupmodal={groupmodal} opengroupmodal={opengroupmodal} />
                <ChatContainer groupmodal={groupmodal} opengroupmodal={opengroupmodal} />
            </div></> : <Spinner simple={false} big={true} />}
    </div>;
};

export default ChatPage;
