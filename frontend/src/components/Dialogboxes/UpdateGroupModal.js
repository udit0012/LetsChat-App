import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import Spinner from '../loaders/Spinner';

const UpdateGroupModal = ({ open, close }) => {
  const appcolor = "black"
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const istablet = useMediaQuery({ query: "(max-width:1224px" })
  const [groupname, setGroupname] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [adduserbox, setAdduserbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adduserlaoding, setAdduserlaoding] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { showAlert, fetchagain, setFetchagain, selectedchat, setSelectedchat, user } = useContext(NoteContext)

  const handlesearch = async (query) => {
    setLoading(true)
    if (!query) {
      return
    }
    try {
      const response = await fetch(`http://localhost:8000/LetsChatApi/allusers/user?search=${query}`, {
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
      const response = await fetch(`http://localhost:8000/LetsChatApi/chat/group/removefromgroup`, {
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
      const response = await fetch(`http://localhost:8000/LetsChatApi/chat/group/addtogroup`, {
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
      setAdduserlaoding(false)
    } catch (error) {
      showAlert(error.message, 'danger')
      setAdduserlaoding(false)
    }

  }
  const updateName = async (e) => {
    e.preventDefault()
    if (!groupname || groupname === selectedchat.chatname) {
      showAlert("Please enter new group name", "warning")
      return
    }
    try {
      setRenameLoading(true)
      const response = await fetch("http://localhost:8000/LetsChatApi/chat/group/renamegroup", {
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
      setRenameLoading(false)
    } catch (error) {
      showAlert(error.message, 'danger')
      setRenameLoading(false)
    }
    setGroupname("")
  }
  return <div className="dialog" style={{ position: "absolute", left: "0", zIndex: "20", display: open ? "block" : "none" }}>
    <div className="dialogbox" style={{ height: "50%", width:isMobile?"95%": istablet ? "70%" : "50%" }}>
      <div className="disflex" style={{ height: "10%", padding: ".4em", justifyContent: "space-between" }} >
        <div className='logoname' style={{ marginLeft: ".5em", color: appcolor, fontSize: "2rem" }}>{selectedchat.chatname}</div>
        <button className='usericon closeicon' style={{ padding: ".3em" }}>{adduserbox && <span className='material-icons' onClick={()=>{setAdduserbox(!adduserbox)}} style={{color:appcolor,margin:"0 .5em"}}>arrow_back</span> }<span onClick={()=>{close(); setAdduserbox(!adduserbox)}} className='material-icons' style={{ color: appcolor }}>close</span></button>
      </div>
      {!adduserbox?(<><div className='userdetails disflex' style={{ height: "45%", justifyContent: 'flex-start', marginBottom: "1em", flexDirection: "column", overflowY: "scroll" }}>
        {selectedchat.users.map((u) => {
          return (<div key={u._id} className='contactCard disflex' style={{ height: "3vh", justifyContent: "flex-start" }}>
            <img className='profileimg' src={u.pic} alt="" style={{ width: "40px", height: "40px" }} />
            <div className='contactinfo'>
              <span className='contactname' style={{ fontSize: isMobile ? "1.7rem" : "1.4rem", textTransform: "capitalize" }}>{u.username}</span>
            </div>
            {user._id !== u._id && user._id === selectedchat.groupAdmin._id && <span className="material-icons disflex" onClick={() => deleteuser(u)} style={{ width: "50%", justifyContent: "flex-end", fontSize: "1.7rem" }}>delete</span>}
            {user._id !== u._id && u._id === selectedchat.groupAdmin._id && <span className="icon disflex" style={{ width: "50%", justifyContent: "flex-end",fontWeight:"bold", fontSize: "1.2rem" }}>admin</span>}
          </div>)
        })}
      </div>
      <form className='RegLegForm disflex' style={{ width: "100%", flexDirection: "column", height: "20%" }} autoComplete='off'>
        <div className='registerInput' style={{ width: '90%', border: "none" }}><input style={{ border: `1px solid ${appcolor}` }} className='RegInput' type="text" placeholder='Group name' name="name" onChange={(e) => { setGroupname(e.target.value) }} />
          <button className="lbtn h100 disflex" onClick={updateName} style={{ width: '30%', fontSize: "1.1rem", margin: "0 .4em" }}>{renameLoading ? <Spinner simple={true} big={false} /> : "Update"}</button></div>
          <div className='registerInput' style={{ width: '90%', border: "none" }}><button className='lbtn w100' onClick={()=>{setAdduserbox(!adduserbox)}}>Add Member</button></div>
      </form></>):
        (<><form className='RegLegForm disflex' style={{ width:"100%", flexDirection: "column",justifyContent:"flex-start", height: "10%",marginBottom:"1em"}} autoComplete='off'>
        <div className='registerInput' style={{ width: '90%', border: "none" }}><input style={{ border: `1px solid ${appcolor}` }} className='RegInput' type="text" placeholder='Add member eg: John' name="users" onChange={(e) => handlesearch(e.target.value)} />
          {/* <button className="lbtn h100" style={{ width: '30%', margin: "0 .4em", fontSize: "1.1rem" }}>Search</button> */}</div>
      </form>
      <div style={{ margin: ".2em", height:isMobile?"57%": "60%" }}>
        {loading ? (<Spinner simple={false} big={false} />) :
          (<div className='w100'>{searchresult?.slice(0, 5).map((u) => {
            return <div key={u._id} className='contactCard disflex' style={{ height: "3vh", justifyContent: "flex-start" }}>
              <img className='profileimg' src={u.pic} alt="" style={{ width: "40px", height: "40px" }} />
              <div className='contactinfo'>
                <span className='contactname' style={{ fontSize: isMobile ? "1.7rem" : "1.4rem", textTransform: "capitalize" }}>{u.username}</span>
              </div>
              <span className="material-icons icon disflex" onClick={() => adduser(u)} style={{ width: "50%", justifyContent: "flex-end", fontSize: "1.7rem" }}>{adduserlaoding ? (<Spinner simple={true} big={false} />) : ("add")}</span>
            </div>
          })}</div>)
        }</div></>)}
      {selectedchat.groupAdmin._id!==user._id && <div className='w100 disflex' style={{ justifyContent: "flex-end" }}><button className='lbtn' style={{ width: "100px", margin: ".7em 1em", backgroundColor: "red" }}>Leave</button></div>}
    </div>
  </div>;
};

export default UpdateGroupModal;
