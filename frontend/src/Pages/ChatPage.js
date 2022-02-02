import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ChatList from '../components/ChaList';
import Chatbox from '../components/Chatbox';
import Spinner from '../components/loaders/Spinner';
import Navbar from '../components/Navbar';

const ChatPage = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    return <div className='w100 disflex' style={{ height: "99.9vh", flexDirection: "column" }}>
        {localStorage.getItem("user") ? <>{!isMobile && <Navbar />}
            <div className='disflex w100' style={{ borderTop: isMobile ? "" : "1px solid white", height: isMobile ? "100%" : "93%" }}>
                <ChatList />
                <Chatbox />
            </div></> : <Spinner simple={false} big={true} />}
    </div>;
};

export default ChatPage;
