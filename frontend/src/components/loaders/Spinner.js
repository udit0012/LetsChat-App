import React from 'react'
import './spinner.css'

const Spinner = (props) => {
    return (
        <div className="disflex" style={props.big ? { width: "100%", height: "100%" } : {width:"100%"}}>
            {!props.simple?(<div className={`${props.big?"lds-ripple-big":"lds-ripple"}`}><div></div><div></div></div>):
            (<div className="lds-dual-ring"></div>)}
        </div>
    )
}

export default Spinner