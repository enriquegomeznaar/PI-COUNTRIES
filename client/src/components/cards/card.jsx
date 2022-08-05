import React from "react";
import { Link } from "react-router-dom";
import card from "./card.css"

export default function Card({ flag, name, continent }) {
  return (
    <div className="card-container">
      <img src={flag} height="200px" width="80%" alt="load"></img>
      <h3 className="h3">{name}</h3>
      <h5 className="h5">{continent}</h5>
    </div>
  );
}
