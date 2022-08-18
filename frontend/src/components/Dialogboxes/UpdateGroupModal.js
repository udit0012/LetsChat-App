import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import Spinner from '../loaders/Spinner';
import styles from './UpdateGroupModal.module.css'

const UpdateGroupModal = ({ open, close }) => {
  const appcolor = "black"
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const [groupname, setGroupname] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [adduserbox, setAdduserbox] = useState(false);
  const [openform, setOpenform] = useState(false)
  const [loading, setLoading] = useState(false);
  const [adduserlaoding, setAdduserlaoding] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { showAlert, link, fetchagain, setFetchagain, selectedchat, setSelectedchat, user } = useContext(NoteContext)

  const handlesearch = async (query) => {
    setLoading(true)
    if (!query) {
      return
    }
    try {
      const response = await fetch(`${link}/LetsChatApi/allusers/user?search=${query}`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
      const json = await response.json();
      setSearchresult(json)
      setLoading(false)
    } catch (error) {
      showAlert(error.message, "danger")
    }
  }
  const deleteuser = async (deluser) => {
    if (selectedchat.groupAdmin._id !== user._id && deluser._id !== user._id) {
      showAlert("Only admin can add new member", "warning")
      return
    }
    try {
      const response = await fetch(`${link}/LetsChatApi/chat/group/removefromgroup`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ chatId: selectedchat._id, userId: deluser._id })
      })
      const json = await response.json();
      deluser._id === user._id ? setSelectedchat() : setSelectedchat(json)
      setFetchagain(!fetchagain)
    } catch (error) {
      showAlert(error.message, "danger")
    }
  }
  const adduser = async (adduser) => {
    if (selectedchat.users.find((c) => c._id === adduser._id)) {
      showAlert("User already in the group", "warning")
      return
    }
    if (selectedchat.groupAdmin._id !== user._id) {
      showAlert("Only admin can add new member", "warning")
      return
    }
    try {
      setAdduserlaoding(true)
      const response = await fetch(`${link}/LetsChatApi/chat/group/addtogroup`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ chatId: selectedchat._id, userId: adduser._id })
      })
      const json = await response.json();
      setSelectedchat(json)
      setFetchagain(!fetchagain)
      setSearchresult([])
      setAdduserbox(false)
      setAdduserlaoding(false)
    } catch (error) {
      showAlert(error.message, 'danger')
      setAdduserlaoding(false)
    }

  }
  const updateName = async (e) => {
    e.preventDefault()
    if (!groupname) {
      showAlert("Please enter new group name", "warning")
      return
    }
    try {
      setRenameLoading(true)
      const response = await fetch(`${link}/LetsChatApi/chat/group/renamegroup`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ chatId: selectedchat._id, chatname: groupname })
      })
      const json = await response.json()
      setSelectedchat(json)
      setFetchagain(!fetchagain)
      setOpenform(false)
      setRenameLoading(false)
    } catch (error) {
      showAlert(error.message, 'danger')
      setRenameLoading(false)
    }
    setGroupname("")
  }
  return <div className={styles.dialog} style={{ zIndex: "20", display: open ? "block" : "none" }}>
    <div className={styles.dialogbox}>
      <div className={styles.dialog_header} >
        <button className={styles.close_icon}>{adduserbox ? <span className='material-icons' onClick={() => { setAdduserbox(false) }}>close</span> : <span onClick={close} className='material-icons'>arrow_back</span>}</button>
        <div className={styles.dialog_headername}>{adduserbox ? "Add participants" : "Group Info"}</div>
      </div>
      {!adduserbox ? (<>
        <div className={styles.groupdetails}>
          <img className={styles.groupimg} src="https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png" alt="" />
          <div className={styles.dialog_headername}>{adduserbox ? "Add participants" : selectedchat.chatname}</div>
        </div>
        {openform ? <form className={styles.update_form} onSubmit={updateName} autoComplete='off'>
          <input className={styles.update_input} type="text" placeholder='New group name' name="name" onChange={(e) => { setGroupname(e.target.value) }} />
          <div>
            <button type="submit" className={styles.update_btn}>{renameLoading ? <Spinner simple={true} big={false} /> : <span className='material-icons'>done</span>}</button>
            <button className={styles.update_btn} onClick={() => { setOpenform(false) }}><span className='material-icons'>close</span></button>
          </div>
        </form>
          :
          <div className={styles.btn_addMember} onClick={() => { setOpenform(!openform) }}><span className='material-icons'>edit</span>Change group name</div>}
        {user._id && user._id === selectedchat.groupAdmin._id && <div className={styles.btn_addMember} onClick={() => { setAdduserbox(!adduserbox) }}><span className='material-icons'>person_add</span> Add Participants</div>}
        <div className={styles.userdetails}>
          {selectedchat.users.map((u) => {
            return (<div key={u._id} className={styles.contactcard}>
              <img className={styles.profileimg} src={u.pic} alt="" />
              <div className={styles.contactinfo}>
                <span className={styles.contactname}>{u.username}</span>
              </div>
              {user._id !== u._id && user._id === selectedchat.groupAdmin._id && <span className={styles.userbtn} onClick={() => deleteuser(u)}> <span className="material-icons">delete</span></span>}
              {u._id === selectedchat.groupAdmin._id && <span className={styles.userbtn} >Group admin</span>}
            </div>)
          })}
        </div>

        {selectedchat.groupAdmin._id !== user._id && <div className={styles.btn_addMember}><span className='material-icons'>logout</span> Exit Group</div>}</>)

        :

        (<><form className={styles.update_form} autoComplete='off'>
          <div className={styles.searchName}>
            <button className={styles.update_btn}><span className='material-icons'>search</span></button>
            <input className={styles.update_input} type="text" placeholder='Member Name ( eg: John )' name="users" onChange={(e) => handlesearch(e.target.value)} />
          </div>
        </form>
          <div style={{ margin: ".2em", height: isMobile ? "100%" : "30vh" }}>
            {loading ? (<Spinner simple={false} big={false} />) :
              (<div className='w100'>{searchresult?.slice(0, 5).map((u) => {
                return <div key={u._id} className={styles.contactcard}>
                  <img className={styles.profileimg} src={u.pic} alt="" />
                  <div className={styles.contactinfo}>
                    <span className={styles.contactname} style={{ fontSize: isMobile ? "1.2rem" : "1.4rem", textTransform: "capitalize" }}>{u.username}</span>
                  </div>
                  <span onClick={() => adduser(u)} className={styles.userbtn}>
                    <span className="material-icons" >{adduserlaoding ? (<Spinner simple={true} big={false} />) : ("add")}</span>
                  </span>
                </div>
              })}</div>)
            }</div></>)}
    </div>
  </div>;
};

export default UpdateGroupModal;
