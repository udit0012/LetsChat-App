import React, { useContext, useEffect, useState } from 'react';
import styles from './ChatList.module.css'
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import GroupModal from './GroupModal/GroupModal';
import SideDrawer from './Sidedrawer';
import { getSender } from '../config/ChatLogic';
import UserProfile from '../Dialogboxes/UserProfile';

const ChatList = ({groupmodal, opengroupmodal}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [loggedUser, setLoggedUser] = useState();
  const [opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { link, fetchagain, user, logout, showAlert, chats, setChats, selectedchat, setSelectedchat,searchSideBar,setSearchSideBar } = useContext(NoteContext)
  
  const onClose = () => {
    setOpendialog(!opendialog)
  }
  const displayDrawer = () => {
    setOpenMenu(false)
    setSearchSideBar(!searchSideBar)
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
      setChats(json.reverse())
      setLoading(false)
    } catch (error) {
      showAlert(error.message, "danger")
    }
  }
  useEffect(() => {
    if (openMenu) {
      setTimeout(() => {
        setOpenMenu(false)
      }, 5000);
    }
  }, [openMenu])

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")))
    fetchchats();
  }, [fetchagain]);

  return <div className={styles.chatList} style={{ display: isMobile ? selectedchat ? "none" : "flex" : "flex" }}>
    <div className={styles.chatlist_box}>
      <div className={styles.chatlist_headbar}>
        <div className={styles.chatlist_head}>
          <div className={styles.chatlist_head1}>Chats</div>
          <div className={styles.chatlist_head2}>Recent Chats</div>
        </div>
        {!isMobile && <button className={styles.chatlist_btn} onClick={opengroupmodal} ><span className='material-icons'>add</span> Create New Group</button>}
        <div className={styles.chatlist_mobile_search}>
          <span className="fa fa-search" onClick={displayDrawer} aria-hidden="true"></span>
        </div>
      </div>
      <div className={styles.chatlist_container}>
        <div className={styles.chatlist_absolutebox}>
          <div className={styles.chatlist_search} onClick={displayDrawer}>
            <span className="material-icons">search</span>
            <div type="text" className={styles.chatlist_searchInput} >Search or start new chat</div>
          </div>
          <div className={styles.chatlist_latestchats} >
            {chats ? (<div className={styles.chatlist_latestchat_list} >
              {chats?.map((chat) => {
                return <div key={chat._id} onClick={() => { setSelectedchat(chat); }} className={styles.chatlist_contactCard} style={selectedchat === chat ? { background: "linear-gradient(to right, #ff6b95, #ff0048)", color: "white" } : {}}>
                  <img className={styles.contactCard_img} src={!chat.isGroupchat ? getSender(user, chat.users).pic : "https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"} alt="" />
                  <div className={styles.contactCard_info}>
                    <div className={styles.contactCard_name} >{chat.isGroupchat ? chat.chatname : getSender(user, chat.users).username}</div>
                    {/* <span className='messagetext' style={{ fontSize: isMobile ? "1.4rem" : "1.2rem" }}>latest message</span> */}
                    <div className={styles.contactCard_msgtext} style={{ color: (selectedchat === chat) ? "white" : "" }}>
                      {chat.latestmessage && <span>{chat.isGroupchat && <b style={{ textTransform: "capitalize" }}>{chat.latestmessage.sender._id !== user._id ? chat.latestmessage.sender.username : "You"} :</b>} {chat.latestmessage.content.length > 30 ? chat.latestmessage.content.substring(0, 31) + "..." : chat.latestmessage.content}</span>}
                    </div>
                  </div>
                </div>
              })}
            </div>) : (<div className='w100 disflex' style={{ height: "93%" }}>
              <div><span className='material-icons'>search</span>Search your friend</div>
              <div>Start a conversation on LetsChat</div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
    <SideDrawer drawer={searchSideBar} displayDrawer={displayDrawer} />
    <GroupModal opengroupmodal={opengroupmodal} groupmodal={groupmodal} />
    {isMobile && <UserProfile open={opendialog} close={onClose} user={user} />}

  </div>;
};

export default ChatList;