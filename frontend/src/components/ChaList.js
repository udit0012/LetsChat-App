import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import NoteContext from '../context/Notecontext';
import GroupModal from './ChatComponents/GroupModal';
import SideDrawer from './ChatComponents/Sidedrawer';
import { getSender } from './config/ChatLogic';
import UserProfile from './Dialogboxes/UserProfile';
import Spinner from './loaders/Spinner';

const ChatList = (props) => {
  const appcolor = "black"
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const [loggedUser, setLoggedUser] = useState();
  const [groupmodal, setGroupmodal] = useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClose = () => {
    setOpendialog(!opendialog)
  }
  const {link, fetchagain, user, logout, showAlert, chats, setChats, selectedchat, setSelectedchat } = useContext(NoteContext)

  const [openMenu, setOpenMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const opengroupmodal = () => {
    setGroupmodal(!groupmodal)
  }
  const displayMenu = () => {
    setOpenMenu(!openMenu)
  }
  useEffect(() => {
    if(openMenu){
      window.addEventListener("click",displayMenu())
    }
  }, []);
  
  const displayDrawer = () => {
    setDrawer(!drawer)
  }
  const fetchchats = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${link}/LetsChatApi/chat/fetchchats`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
      const json = await response.json();
      setChats(json)
      setLoading(false)
    } catch (error) {
      showAlert(error.message, "danger")
    }
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")))
    fetchchats();
  }, [fetchagain]);

  return <div className='h100 disflex' style={{ position: "relative", display: isMobile ? selectedchat ? "none" : "flex" : "flex", backgroundColor: "white", justifyContent: "flex-start", borderTop: isMobile ? "" : "1px solid white", width: isMobile ? "100%" : "500px", flexDirection: "column" }}>
    <div className='w100 h100' style={{ position: "absolute" }}>
      <div className='topbar w100 disflex' style={{ justifyContent: "space-between", backgroundColor: appcolor }}>
        <div className='topbarHead' style={{ fontSize: isMobile ? "1.3rem" : istablet ? "1.5rem" : "1.6rem", margin: isMobile ? ".3em .6em" : ".7em .6em" }}>Recent Chats</div>
        {!isMobile && <button className='lbtn disflex' onClick={opengroupmodal} style={{ fontSize: '.8rem', backgroundColor: "white", color: appcolor, marginRight: ".6em" }}><span className='material-icons' style={{ color: appcolor, marginRight: ".2em", fontSize: "1.3rem" }}>add</span> Create Group</button>}
        {isMobile && <div className='disflex' style={{ marginRight: ".6em" }}>
          <span className='material-icons' onClick={displayDrawer} style={{ color: "white", fontSize: "2rem", marginRight: ".4em",cursor:"pointer" }}>search</span>
          <span className='material-icons' onClick={opengroupmodal} style={{ color: "white", fontSize: "2rem", marginRight: ".4em",cursor:"pointer" }}>add</span>
          <div style={{ position: "relative" }}>
            <img onClick={displayMenu} className='profileimg' style={{ width: "40px", height: "40px" }} src={localStorage.getItem("token") ? user.pic : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"} />
            <ul className='menubox' style={{ display: openMenu ? "block" : "none" }}>
              {/* <li className='menuItems' ><Link to="/" style={{ textDecoration: "none",color:appcolor}}> Home</Link></li> */}
              <li className='menuItems' onClick={onClose}>See Profile</li>
              <li className="menuItems" onClick={logout}>Logout</li>
            </ul>
          </div> </div>}
      </div>
      <div className='w100' style={{ height: "92%" }}>
        <div className='w100 h100'>
          {!isMobile && <div className='inputbar w100 disflex' style={{ height: "7%", backgroundColor: "#e6e6e6" }}>
            <div className="inputbox disflex" onClick={displayDrawer} style={{ cursor: "pointer", }}>
              <span className="material-icons">search</span>
              <div type="text" className="searchinput" >Search or start new chat</div>
            </div>
          </div>}
          {chats ? (<div className='w100 disflex' style={{ justifyContent: "flex-end", flexDirection: "column-reverse", height: "93%", overflow: "auto" }}>
            {chats?.map((chat) => {
              return <div key={chat._id} onClick={() => {setSelectedchat(chat);}} className='contactCard' style={selectedchat === chat ? { backgroundColor: appcolor, color: "white" } : {}}>
                <img className='profileimg' src={!chat.isGroupchat ? getSender(user, chat.users).pic : "https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"} alt="" />
                <div className='contactinfo'>
                  <span className='contactname' style={{ fontSize: isMobile ? "1.3rem" : "1.4rem", textTransform: "capitalize" }}>{chat.isGroupchat ? chat.chatname : getSender(user, chat.users).username}</span>
                  {/* <span className='messagetext' style={{ fontSize: isMobile ? "1.4rem" : "1.2rem" }}>latest message</span> */}
                  <span className='messagetext' style={{ fontSize: isMobile ? "1.2 rem" : "1.2rem", color: (selectedchat === chat) ? "white" : "" }}>
                    {chat.latestmessage && <span>{chat.isGroupchat && <b style={{ textTransform: "capitalize" }}>{chat.latestmessage.sender._id !== user._id ? chat.latestmessage.sender.username : "You"} :</b>} {chat.latestmessage.content.length > 20 ? chat.latestmessage.content.substring(0, 21) + "..." : chat.latestmessage.content}</span>}
                  </span>
                </div>
              </div>
            })}
          </div>) : ( <div className='w100 disflex' style={{height:"93%"}}>
            <div><span className='material-icons'>search</span>Search your friend</div>
            <div>Start a conversation on LetsChat</div>
          </div> )}
        </div>
      </div>
    </div>
    <SideDrawer drawer={drawer} displayDrawer={displayDrawer} />
    <GroupModal opengroupmodal={opengroupmodal} groupmodal={groupmodal} />
    {isMobile && <UserProfile open={opendialog} close={onClose} user={user} />}

  </div>;
};

export default ChatList;