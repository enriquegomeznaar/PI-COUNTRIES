import React from "react";

export default function Card({ flag, name, continent }) {
    return (
  
      <div>
        <img src={flag} height='100px' width='100px' alt="load"></img>
        <h3>{name}</h3>
        <h5>{continent}</h5>
      </div>
    );
  }