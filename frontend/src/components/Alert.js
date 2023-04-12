import React, { useContext } from "react";
import Notecontext from "../context/Notecontext";

const Alert = () => {
  const { alert,setAlert } = useContext(Notecontext);
  return (
    <>
    {alert?<div className={`toast ${alert?"active":""}`}>
      <div class="toast-content">
        <i className={`fas fa-solid fa-check check check-${alert.type}`}></i>

        <div class="message">
          <span class="text text-1">{alert.type==="success"?"Success":alert.type==="warning"?"Warning":"Error"}</span>
          <span class="text text-2">{alert.message}</span>
        </div>
      </div>
      <i onClick={()=>{setAlert(null)}} class="fa-solid fa-xmark close"></i>
      <div class={`progress progress-${alert.type} active`}></div>
    </div>:""}
    </>
  );
};

export default Alert;
