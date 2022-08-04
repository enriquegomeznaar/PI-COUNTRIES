import React from "react";
import { Link } from "react-router-dom";
import landing from "./landing.css"


export default function LandingPage(){
    return(
        <div className="container">
            <h1 className="title">Welcome to my Country Page!</h1>
            <Link to= '/home'>
            <button className="button">Continue</button>
            </Link>
        </div>
    )
}