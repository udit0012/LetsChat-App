import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import Spinner from '../loaders/Spinner';

const GroupModal = ({ opengroupmodal, groupmodal }) => {
    const { chats, setChats,link, showAlert } = useContext(NoteContext)
    const [chatname, setChatname] = useState();
    const [selectedusers, setSelectedusers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

    const [loading, setLoading] = useState(false);
    
    const HandleOnSubmit = async (e) => {
        e.preventDefault()
        if (!selectedusers) {
            showAlert("Add atleast two members", "warning")
            return
        }
        try {
            const response = await fetch(`${link}/LetsChatApi/chat/group/creategroup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                }, body: JSON.stringify({ name: chatname, users: JSON.stringify(selectedusers.map((u) => u._id)) })
            })
            const json = await response.json();
            setChats(chats.concat(json))
            opengroupmodal();
            showAlert("New Group Created", "success")
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }
    const grouphandle = (adduser) => {
        if (selectedusers.includes(adduser)) {
            showAlert("User already in the Group", "warning")
            return
        }
        setSelectedusers([...selectedusers, adduser])
    }
    const deleteuser = (deluser) => {
        setSelectedusers(selectedusers.filter((sel) => sel._id !== deluser._id))
    }
    const handlesearch = async (query) => {
        setLoading(true)
        setSearch(query)
        if (!query) {
            return
        }
        try {
            const response = await fetch(`${link}/LetsChatApi/allusers/user?search=${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            const json = await response.json();
            setSearchResult(json)
            setLoading(false)
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }
    const appcolor = "black"
    return <div className="dialog" style={{ backgroundColor: "white", zIndex: "20", display: groupmodal ? "block" : "none" }}>
        <div className="disflex" style={{ padding: ".4em", justifyContent: "space-between" }} >
            <div className='logoname' style={{ marginLeft: ".5em", color: appcolor, fontSize:isMobile?"2rem": "2.5rem" }}>Create Group</div>
            <button className='usericon closeicon' onClick={opengroupmodal} style={{ padding: ".3em" }}><span className='material-icons' style={{ color: appcolor }}>close</span></button>
        </div>
        <hr />
        <form className='RegLegForm disflex' style={{ width: "100%", flexDirection: "column", height: "20%" }} autoComplete='off' action="post" onSubmit={HandleOnSubmit} >
            <div className='registerInput' style={{ width: '70%' }}><input className='RegInput' type="text" placeholder='Group name' name="name" onChange={(e) => { setChatname(e.target.value) }} required /></div>
            <div className='registerInput' style={{ width: '70%' }}><input className='RegInput' type="text" placeholder='Add member eg: John' name="users" onChange={(e) => handlesearch(e.target.value)} required /></div>
            <button className="lbtn" type='submit' style={{ width: '70%' }}> Create group</button>
        </form>
        <div className='disflex w100' style={{ padding: ".3em 0em", flexWrap: "wrap" }}>{
            selectedusers.map((u) => {
                return <div className='disflex' key={u._id} style={{ fontSize: ".8rem", padding: ".4em .4em", borderRadius: ".3em", backgroundColor: appcolor, color: "white", margin: "0.2em .2em" }}>
                    {u.username}
                    <span className="material-icons" onClick={() => deleteuser(u)} style={{ fontSize: "1rem", color: "white", margin: "0 .4em", cursor: "pointer" }}>close</span>
                </div>
            })
        }
        </div>
        <div className='w100' >{
            loading ? (
                <Spinner simple={true} big={false} />
            ) : (
                searchResult.slice(0, 4).map((user) => {
                    return <div key={user._id} onClick={() => grouphandle(user)} className='contactCard'>
                        <img className='profileimg' src={user.pic} alt="" />
                        <div className='contactinfo'>
                            <span className='contactname' style={{ fontSize: isMobile ? "1.7rem" : "1.4rem", textTransform: "capitalize" }}>{user.username}</span>
                            <span className='messagetext' style={{ fontSize: isMobile ? "1.4rem" : "1.2rem" }}>{user.phoneno}</span>
                        </div>
                    </div>
                })
            )
        }
        </div>
    </div>
};

export default GroupModal;