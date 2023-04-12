import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './SearchSideDrawer/SearchSideDrawer.module.css'
import NoteContext from '../../context/Notecontext';
import Spinner from '../loaders/Spinner';
const SideDrawer = (props) => {
    const { link, showAlert, chats, setChats, setSelectedchat } = useContext(NoteContext)
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
            const response = await fetch(`${link}/LetsChatApi/allusers/user?search=${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            })
            console.log(response);
            const data = await response.json();
            setSearchresult(data)
            console.log("data",data);
            setLoading(false)
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }
    const accessChat = async (userId) => {
        setSelectedchat()
        try {
            setLoadingchat(true)
            const response = await fetch(`${link}/LetsChatApi/chat/accesschat`, {
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
                setSearch("")
                setSearchresult([])
                setLoadingchat(false)
                props.displayDrawer()
            })
        }
        catch (error) {
            showAlert(error.message, "danger")
        }
    }

    return <div className={styles.searchDrawer} style={{ left: props.drawer ? "" : "-1000px" }}>
        <div className={styles.searchDrawer_container}>
            <div className={styles.searchDrawer_absolutebox}>
                <div className={styles.searchDrawer_search} >
                    <span className="material-icons" onClick={props.displayDrawer}>arrow_back</span>
                    <input className={styles.searchDrawer_searchInput} type="text" value={search} name='search' onChange={(e) => { setSearch(e.target.value) }} placeholder='Search or start new chat' />
                    <button onClick={handlesearch} className={styles.search_btn} ><span className='material-icons'>search</span></button>
                </div>
                <div className={styles.searchDrawer_searchchats}>
                    {loading ? (
                        <Spinner simple={false} big={false} />
                    ) :
                        (<div className={styles.searchDrawer_searchchats_list}>{searchresult.length?searchresult.map((user) => {
                            return <div key={user._id} className={styles.searchDrawer_contactCard} onClick={() => accessChat(user._id)}>
                                <img className={styles.contactCard_img} src={user.pic} alt="" />
                                <div className={styles.contactCard_info}>
                                    <div className={styles.contactCard_name} >{user.username}</div>
                                    <div className={styles.contactCard_phoneno} >{user.phoneno}</div>
                                </div>
                            </div>
                        }):<div>No User found</div>}
                        </div>

                        )}
                    {loadingchat && <Spinner simple={false} big={true} />}
                </div>
            </div>
        </div>
    </div>;
};

export default SideDrawer;

