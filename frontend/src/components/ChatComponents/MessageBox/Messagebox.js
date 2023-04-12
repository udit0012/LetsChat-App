import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './MessageBox.module.css'
import io from "socket.io-client"
import NoteContext from '../../../context/Notecontext';
import { getSender } from '../../config/ChatLogic';
import UpdateGroupModal from '../../Dialogboxes/UpdateGroupModal';
import UserProfile from '../../Dialogboxes/UserProfile';
import Spinner from '../../loaders/Spinner';
import ScrollableChat from '../ScrollableChat/ScrollableChat';


// const EndPoint = "https://letschat-with-friends.herokuapp.com"
const EndPoint = "http://localhost:8000"
var socket, selecetdChatCompare;

const MessageBox = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [opendialog, setOpendialog] = useState(false);
    const [groupdetail, setGroupdetail] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [newmessage, setNewmessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [room, setRoom] = useState(false);
    const [istyping, setIstyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const { link, user, selectedchat, setSelectedchat, showAlert, fetchagain, setFetchagain, notification, setNotification } = useContext(NoteContext)

    const onClose = () => {
        setOpendialog(!opendialog)
    }
    useEffect(() => {
        socket = io(EndPoint)
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", (room1) => {

            setRoom(room1)
            setIstyping(true)
        })
        socket.on("stop typing", (room) => {
            setIstyping(false)
        })
    }, []);
    const displaygroupdetail = () => {
        setGroupdetail(!groupdetail)
    }
    const fetchallmessages = async () => {
        if (!selectedchat) return;
        try {
            setLoading(true)
            const response = await fetch(`${link}/LetsChatApi/messages/fetchallmessages/${selectedchat._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            const json = await response.json();
            setMessages(json)
            setLoading(false)

            socket.emit('join chat', selectedchat._id)
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }

    const sendmessage = async (newMessage) => {
        if (newMessage) {
            setNewmessage("")
            socket.emit("stop typing", selectedchat._id)
            try {
                const response = await fetch(`${link}/LetsChatApi/messages/sendmessage`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({ chatId: selectedchat._id, msg: newMessage })
                })
                const json = await response.json();
                socket.emit("new message", json)
                setFetchagain(!fetchagain)
                setMessages(messages.concat(json))
            } catch (error) {
                showAlert(error.message, "danger")
            }
        }
    }
    useEffect(() => {
        fetchallmessages();
        selecetdChatCompare = selectedchat
    }, [selectedchat]);
    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selecetdChatCompare || selecetdChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification(notification.concat(newMessageRecieved));
                    setFetchagain(!fetchagain)
                }
            }
            else {
                setMessages(messages.concat(newMessageRecieved))
            }
        })
    });
    const typinghandler = (e) => {
        setNewmessage(e.target.value)
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedchat)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 5000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedchat);
                setTyping(false);
            }
        }, timerLength);
    }

    return <div className={styles.chatbox_container}>
        {selectedchat ? (<>
            <div className={styles.chatbox_header}>
                <div className={styles.chatbox_header_cont}>
                    <div className={styles.chatbox_header_details}>
                        <div className={styles.chatbox_header_backbtn} onClick={() => setSelectedchat()}>
                            {isMobile && <span className="fa-solid fa-arrow-left"></span>}
                            <img className={styles.chatbox_header_img} src={!selectedchat.isGroupchat ? getSender(user, selectedchat.users).pic : "https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"} alt="" />
                        </div>
                        <div className={styles.chatbox_header_info}>
                            <div className={styles.chatbox_header_name} onClick={!selectedchat.isGroupchat ? onClose : displaygroupdetail}>{selectedchat.isGroupchat ? selectedchat.chatname : getSender(user, selectedchat.users).username}</div>
                            <div className={styles.chatbox_lastseen}>last seen at 5 hours ago</div>
                        </div>
                    </div>
                    <div className={styles.chatbox_header_options}>
                        <div className={styles.chatbox_icons}>
                            <i className="fa-solid fa-paperclip"></i>
                        </div>
                        <div className={styles.chatbox_icons}>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                    {selectedchat.isGroupchat ? (<>
                        {<UpdateGroupModal open={groupdetail} close={displaygroupdetail} />}
                    </>) : <>{<UserProfile open={opendialog} close={onClose} user={getSender(user, selectedchat.users)} />}</>}
                </div>
            </div>
            <div className={styles.chatbox_msgbox}>
                <div className={styles.chatbox_absolute_cont}>
                    <div className={styles.chatbox_msg_cont}>
                        {loading ? (<div className="w100 h100 disflex"><Spinner simple={false} big={false} /></div>) :
                            <ScrollableChat messages={messages} room={room} typing={istyping} />}
                    </div>
                </div>
                <hr className={styles.chatbox_horizontal_line} />
                <form className={styles.chatbox_inputbox} onSubmit={(e) => {
                    e.preventDefault();
                    if (newmessage.trim()) {
                        sendmessage(newmessage.trim());
                    }
                    else {
                        setNewmessage("")
                        showAlert("Message cannot be empty", "warning")
                    }
                }}>
                    <button className={styles.chatbox_msgicons}><i className="material-icons">add</i></button>
                    <div className={styles.chatbox_msg_input}>
                        <input type="text" className={styles.chatbox_input} value={newmessage} onChange={typinghandler} placeholder='Type a message here' />
                    </div>
                    <button type='submit' className={styles.chatbox_msgicons}><i className="material-icons">send</i></button>
                    {/* <button className='chatbtn disflex' type='submit' style={{}}><span className="material-icons" style={{ color: "white", fontSize: "2rem" }}>send</span></button> */}
                </form>
            </div>
        </>)
            : (
                <div className={styles.chatbox_msgdisplay} style={{ flexDirection: "column" }}>
                    <div className={styles.chatbox_logo}>LetsChat</div>
                    <div className={styles.chatbox_logomsg}>Click on a chat to start conversation</div>
                </div>
            )}
        
    </div>;
};

export default MessageBox;