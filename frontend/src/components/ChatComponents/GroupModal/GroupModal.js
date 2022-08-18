import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './GroupModal.module.css'
import NoteContext from '../../../context/Notecontext';
import Spinner from '../../loaders/Spinner';

const GroupModal = ({ opengroupmodal, groupmodal }) => {
    const { chats, setChats, link, showAlert } = useContext(NoteContext)
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
            opengroupmodal();
            setSelectedusers([]);
            setChatname();
            setChats(chats.concat(json))
            showAlert("New Group Created", "success")
        } catch (error) {
            showAlert(error.message, "danger")
        }
    }
    const grouphandle = (adduser) => {
        if (selectedusers.includes(adduser)) {
            showAlert("User already selected", "warning")
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
    return <div className={styles.dialog_box} style={{ display: groupmodal ? "block" : "none" }}>
        <div className={styles.dialog_headbar} >
            <div className={styles.dialog_head}>
                <div className={styles.dialog_head1}>Create Group</div>
            </div>
            <button className={styles.dialog_headbtn} onClick={opengroupmodal}><span className='material-icons'>close</span></button>
        </div>
        <hr />
        <form className={styles.dialog_form} autoComplete='off' action="post" onSubmit={HandleOnSubmit} >
            <div className={styles.dialog_inputbox}><input className={styles.dialog_input} type="text" placeholder='Group subject' name="name" onChange={(e) => { setChatname(e.target.value) }} required /></div>
            <div className={styles.dialog_inputbox}><input className={styles.dialog_input} type="text" placeholder='Type contact name' name="users" onChange={(e) => handlesearch(e.target.value)} required /></div>
            <button className={styles.dialog_btn} type='submit'> Create group</button>
        </form>
        <div className={styles.dialog_selectedbox}>
            <div className={styles.dialog_absolutebox}>{
                selectedusers.map((u) => {
                    return <div className={styles.dialog_selectedCard} key={u._id}>
                        <span><img className={styles.selectedCard_img} src={u.pic} alt="" /></span>
                        <span>{u.username.length>5?u.username.slice(0,5)+"...":u.username}</span>
                        <span className={styles.selectedCard_icons} onClick={() => deleteuser(u)} ><i class="fa-solid fa-xmark"></i></span>
                    </div>
                })
            }
            </div>
        </div>
        <div className={styles.dialog_contacts} >{
            loading ? (
                <Spinner simple={true} big={false} />
            ) : (
                <div className={styles.dialog_contactslist}>
                    {searchResult.map((user) => {
                        return <div key={user._id} onClick={() => grouphandle(user)} className={styles.dialog_contactCard}>
                            <img className={styles.contactCard_img} src={user.pic} alt="" />
                            <div className={styles.contactCard_info}>
                                <div className={styles.contactCard_name} >{user.username}</div>
                                <div className={styles.contactCard_phoneno} >{user.phoneno}</div>
                            </div>
                        </div>
                    })}
                </div>)
        }
        </div>
    </div>
};

export default GroupModal;