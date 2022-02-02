import React, {useContext } from 'react'
import Notecontext from '../context/Notecontext'

const Alert = () => {
    const { alert } = useContext(Notecontext)
    return (
        <div style={{display:'flex',justifyContent:"center",width:"100%", backgroundColor: "transparent",position:"absolute",top:'0' }}>
            {alert && <div className={`alert-${alert.type}`} style={{height:"50px",padding:".1em 1em",display:"flex",justifyContent:"center",alignItems:"center",margin:".5em 0em",fontWeight:"bold",fontSize:'1.3rem',borderRadius:".3em"}}>
               !! {alert.message}
            </div>}
        </div>
    )
}

export default Alert