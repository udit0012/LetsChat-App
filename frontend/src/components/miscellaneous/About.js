import React from 'react'
import {useMediaQuery} from 'react-responsive'

function About() {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const istablet = useMediaQuery({ query: "(max-width:1224px" })
    const blue = "black"
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
        <div className='w100' style={{display: "flex", justifyContent: "center", fontFamily: "'PT Sans Narrow', sans-serif" }}>
            <div className="getstart" style={{ width:istablet?"100%": "60%",margin:"1em 0" }}>
                <div style={{display:"flex",justifyContent:'center',fontSize:"3rem",margin:'.5em 0'}}>About Lets Chat</div>
                <div className="cards w100" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>

                    {about.map((ele,index) => {
                        return (
                            <div key={index} style={{ width:isMobile?"100%": "45%",height:isMobile?"5vh":"10vh", display: "flex",margin:"1em .5em" }}>
                                <div><span className='material-icons' style={{ color: blue,fontSize:'1.9rem' }}>{ele.icon}</span></div>
                                <div style={{padding:"0 .8em"}}>
                                    <div style={{fontSize:isMobile?"1.4rem":"1.8rem",fontWeight:"500"}}>{ele.title}</div>
                                    {!isMobile && <div style={{fontSize:isMobile?"1.1rem":"1.3rem"}}>{ele.description}</div>}
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
