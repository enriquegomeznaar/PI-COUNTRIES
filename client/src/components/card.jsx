import React from "react";
import {Link} from "react-router-dom"
const styles= {
  h3:{
    fontSize:'30px',
    textDecoration:'none',
  },
  h5:{
    fontSize: '20px',
  },
}
export default function Card({ flag, name, continent }) {
    return (
  
      <div>
        
        <img src={flag} height='200px' width='300px' alt="load"></img>
        <h3 style={styles.h3}>{name}</h3>
        <h5 style={styles.h5}>{continent}</h5>
        
      </div>
    );
  }