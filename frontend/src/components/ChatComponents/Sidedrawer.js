import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NoteContext from '../../context/Notecontext';
import Spinner from '../loaders/Spinner';
const SideDrawer = (props) => {
    const appcolor = "black"
    const { user, handledialog, logout, showAlert, chats, setChats, selectedchat, setSelectedchat } = useContext(NoteContext)
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [search, setSearch] = useState("");
    const [searchresult, setSearchresult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingchat, setLoadingchat] = useState(false);


    const handlesearch = async () => {
        if (!search) {
            showAlert("Please enter search value", "warning")
            return
        }
        try {
            setLoading(true)
            const response = await fetch(`https://letschat-react-app.herokuapp.com/LetsChatApi/allusers/user?search=${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            })
            const data = await response.json();
            setSearchresult(data)
            setLoading(false)
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }
    const accessChat = async (userId) => {
        setSelectedchat()
        try {
            setLoadingchat(true)
            const response = await fetch(`https://letschat-react-app.herokuapp.com/LetsChatApi/chat/accesschat`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ userId })
            }).then((response) => response.json()).then((json) => {
                if (!chats.find((c) => c._id === json._id)) {
                    setChats(chats.concat(json))
                }
                setLoadingchat(false)
                props.displayDrawer()
            })
        }
        catch (error) {
            showAlert(error.message, "danger")
        }
    }

    return <div className='h100 w100' style={{ backgroundColor: "white", position: "absolute", left: props.drawer ? "0" : "-1000px", transition: ".1s" }}>
        <div className='inputbar w100 disflex' style={{ height:isMobile?"7vh":"7%", backgroundColor: appcolor }}>
            <div className="inputbox disflex">
                <span className="material-icons" onClick={props.displayDrawer} style={{ cursor: "pointer", color: appcolor }}>arrow_back</span>
                <input type="text" value={search} name="search" onChange={(e) => { setSearch(e.target.value) }} className="searchinput" placeholder='Search or start new chat' autoFocus />
            </div>
            <button onClick={handlesearch} className='lbtn disflex' style={{ padding: "0.3em 0.1em", marginLeft: ".3em" }}><span className='material-icons'>search</span></button>
        </div>
        <div className={`w100`} style={{ height: "93%", overflow: "auto" }}>
            {loading ? (
                <Spinner simple={false} big={false} />
            ) : (
                searchresult?.map((user) => {
                    return <div key={user._id} className='contactCard' onClick={() => accessChat(user._id)}>
                        <img className='profileimg' src={user.pic} alt="" />
                        <div className='contactinfo'>
                            <span className='contactname' style={{ fontSize: isMobile ? "1.7rem" : "1.4rem", textTransform: "capitalize" }}>{user.username}</span>
                            <span className='messagetext' style={{ fontSize: isMobile ? "1.4rem" : "1.2rem" }}>{user.phoneno}</span>
                        </div>
                    </div>
                })
            )}
            {loadingchat && <Spinner simple={false} big={true} />}
        </div>
    </div>;
};

export default SideDrawer;

