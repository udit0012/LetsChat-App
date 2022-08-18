import React from 'react'
import {useMediaQuery} from 'react-responsive'
import styles from './About.module.css'

function About() {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const about = [
        {
            icon: "person",
            title: "Make one to one messages with your contacts",
            description: "See who’s already available to connect for chat or invite a friend to join."
        },
        {
            icon: "join_inner",
            title: "Let friends know that you’ve joined",
            description: "Tap into a contact to message the person."
        },
        {
            icon: "people",
            title: "Set up groups for your friends & family",
            description: "Create a group of 32 participants. Then, tap the group name to easily start a group chat"
        },
        {
            icon: "security",
            title: "Lets Chat uses end-to-end encryption",
            description: "Your calls and messages stay private and can only be seen by you and the person you're talking with."
        },
    ]
    return (
        <div className={styles.about}>
            <div className={styles.about_container}>
                <div className={styles.about_head}>About Lets Chat</div>
                <div className={styles.about_cards} >

                    {about.map((ele,index) => {
                        return (
                            <div key={index} className={styles.about_card}>
                                <div className={styles.card_icon}><span className='material-icons'>{ele.icon}</span></div>
                                <div className={styles.card_desc}>
                                    <div className={styles.card_title}>{ele.title}</div>
                                    <div className={styles.card_description}>{ele.description}</div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        </div>
    )
}

export default About
