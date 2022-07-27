import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";

export default function LandingPage(){
    return(
        <div>
            <h1>Welcome to my Country Page!</h1>
            <Link to= '/home'>
            <button>Continue</button>
            </Link>
        </div>
    )
}