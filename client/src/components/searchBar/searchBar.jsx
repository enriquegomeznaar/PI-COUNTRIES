import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions/actions";
import searchBar from "./searchBar.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerInput = (e) => {
    e.preventDefault();
    const value = e.target.value
    const value2 = value.charAt(0).toUpperCase() + value.slice(1)
    setName(value2);
  };

  const handlerButton = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
    setName("");
  };
  useEffect(() => {
    dispatch(getByName(name));
  }, [dispatch]);
  return (
    <div className="search-container">
      <input
        className="input"
        type="text"
        placeholder="search country..."
        value={name}
        onChange={(e) => handlerInput(e)}
      ></input>
      <button
        className="btn"
        
        type="submit"
        onClick={(e) => handlerButton(e)}
      >
       Go
      </button>
    </div>
  );
}
