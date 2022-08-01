import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
const styles={
    landing: {
        margin:'0',
        padding:'50px',
    },
    button:{
        borderRadius:'10px',
        cursor:'pointer',
        border:'2px solid royalblue',
        padding:'10px'
    }
}

export default function LandingPage(){
    return(
        <div>
            <h1 style={styles.landing}>Welcome to my Country Page!</h1>
            <Link to= '/home'>
            <button style={styles.button}>Continue</button>
            </Link>
        </div>
    )
}