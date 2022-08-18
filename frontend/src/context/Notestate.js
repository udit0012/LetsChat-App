import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import NoteContext from "./Notecontext"

const Notestate = (props) => {
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState({});
    const [selectedchat, setSelectedchat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const [fetchagain, setFetchagain] = useState(false);
    const [searchSideBar, setSearchSideBar] = useState(false)
    // const link = 'http://localhost:8000'
    const link = 'https://letschat-with-friends.herokuapp.com'

    const fetchuserdata = async () => {
        try {
            const resposne = await fetch(`${link}/LetsChatApi/auth/getUser`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    'auth-token': localStorage.getItem("token")
                },
            })
            const u = await resposne.json();
            localStorage.setItem("user", JSON.stringify(u))
            setUser(u)
        } catch (error) {
            showAlert(error.message,"danger")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const userinfo = JSON.parse(localStorage.getItem("user"));
            setUser(userinfo)
            console.log("user = 1", user);
            // if (!user) {
            //     navigate("/")
            // }else{
            //     navigate("/LetsChat")
            // }
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/");
    }
    const [opendialog, setOpendialog] = useState(false)

    const handledialog = () => {
        if (localStorage.getItem("token")) {
            setOpendialog(!opendialog)
            fetchuserdata()
        }
        else {
            navigate("/login")
        }
    }
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    return <NoteContext.Provider value={{
        link,
        fetchagain,
        setFetchagain,
        selectedchat,
        setSelectedchat,
        chats,
        setChats,
        fetchuserdata,
        alert,
        opendialog,
        handledialog,
        logout,
        showAlert,
        user,
        setUser,
        notification,
        setNotification,
        searchSideBar, setSearchSideBar
    }}>
        {props.children}
    </NoteContext.Provider>
};

export default Notestate;