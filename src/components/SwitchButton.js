import React from "react";
import "../styles/SwitchButton.css";


const toggleBtn = {
    right: "none",
    left: "0",
    backgroundColor: "black"
}

function SwitchButton(props){
       const styleToggle = props.active? {} : toggleBtn;
       return (
           <button onClick={  
                  props.onClick} 
                  className="switch-btn">
               <span className="switch-btn-toggle" style={styleToggle}></span>
           </button>
       )
}


export default SwitchButton;