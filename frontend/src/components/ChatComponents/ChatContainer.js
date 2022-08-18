import React from 'react'
import ChatList from './ChaList'
import Chatbox from './Chatbox'
import styles from './ChatList.module.css'

const ChatContainer = ({opengroupmodal,groupmodal}) => {
  return (
    <div className={styles.chatContainer}>
        <ChatList opengroupmodal={opengroupmodal} groupmodal={groupmodal} />
        <Chatbox />
    </div>
  )
}

export default ChatContainer