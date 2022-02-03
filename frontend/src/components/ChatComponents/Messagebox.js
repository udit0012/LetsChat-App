import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import io from "socket.io-client"
import NoteContext from '../../context/Notecontext';
import { getSender } from '../config/ChatLogic';
import UpdateGroupModal from '../Dialogboxes/UpdateGroupModal';
import UserProfile from '../Dialogboxes/UserProfile';
import Spinner from '../loaders/Spinner';
import ScrollableChat from './ScrollableChat';

const EndPoint = "https://letschat-react-app.herokuapp.com/"
// const EndPoint = "http://localhost:8000"
var socket, selecetdChatCompare;

const MessageBox = (props) => {
    const appcolor = "black"
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
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
                socket.emit("newmessage", json)
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
        socket.on("messagerecieved", (newMessage) => {
            if (!selecetdChatCompare || selecetdChatCompare._id !== newMessage.chat._id) {
                if (!notification.includes(newMessage)) {
                    setNotification(notification.concat(newMessage));
                    setFetchagain(!fetchagain)
                }
            }
            else {
                setMessages(messages.concat(newMessage))
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

    return <div className='w100 h100 disflex chatcontainer'>
        {selectedchat ? (<>
            <div className="profileheader w100 disflex" style={{ backgroundColor: appcolor, justifyContent: "space-between" }}>
                <div className='disflex'>
                    <img className='profileimg' onClick={!selectedchat.isGroupchat ? onClose : displaygroupdetail} style={{ marginLeft: "1em", cursor: "pointer" }} src={!selectedchat.isGroupchat ? getSender(user, selectedchat.users).pic : "https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"} alt="" />
                    <div className='contactinfo' style={{ cursor: "pointer" }}>
                        <span className='contactname' style={{ fontSize: isMobile ? "1.4rem" : "1.8rem", color: "white", textTransform: "capitalize" }}>{selectedchat.isGroupchat ? selectedchat.chatname : getSender(user, selectedchat.users).username}</span>
                    </div>
                    {selectedchat.isGroupchat ? (<>
                        {<UpdateGroupModal open={groupdetail} close={displaygroupdetail} />}
                    </>) : <>{<UserProfile open={opendialog} close={onClose} user={getSender(user, selectedchat.users)} />}</>}
                </div>
                <div className='disflex' style={{ marginRight: "1em" }}>
                    {isMobile && <div className='chatbtn disflex' onClick={() => setSelectedchat()}> <span className="material-icons" style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>
                        arrow_back_ios</span> </div>}
                    {/* <div className='disflex' onClick={!selectedchat.isGroupchat ? onClose : displaygroupdetail} style={{ cursor: "pointer", backgroundColor: "white", padding: ".4em", borderRadius: ".4em" }}><span className="material-icons-outlined" style={{ color: appcolor, fontSize: "2rem" }}>remove_red_eye</span></div> */}
                </div>
            </div>
            <div className='msgbox'>
                {loading ? (<Spinner simple={false} big={true} />) :
                    <ScrollableChat messages={messages} room={room} typing={istyping} />}

            </div>
            <form className='msginput w100 disflex' onSubmit={(e) => {
                e.preventDefault();
                if (newmessage.trim()) {
                    sendmessage(newmessage.trim());
                }
                else {
                    setNewmessage("")
                    showAlert("Message cannot be empty", "warning")
                }
            }} style={{ backgroundColor: appcolor }}>
                <div className="inputbox" style={{ width: isMobile ? "90%" : "100%" }}>
                    <input type="text" className="searchinput" value={newmessage} onChange={typinghandler} placeholder='Type a message' style={{ margin: "0 .4em", padding: '.4em .6em', fontSize: isMobile ? "1.2rem" : "1.4rem", width: "97%" }} />
                </div>
                <button className='chatbtn disflex' type='submit' style={{}}><span className="material-icons" style={{ color: "white", fontSize: "2rem" }}>send</span></button>
            </form>
        </>)
            : (
                <div className='msgbox disflex' style={{ flexDirection: "column", backgroundColor: "#eaeaea" }}>
                    <div className='logoname'>LetsChat</div>
                    <div>Click on a chat to start conversation</div>
                </div>
            )}

    </div>;
};

export default MessageBox;