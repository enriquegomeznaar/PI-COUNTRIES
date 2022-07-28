import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions/actions";

const styles = {
  contenedor: {},
  input: {
    border: "0",
    outline: "0",
    backgroundColor: "#CCCCCC",
    opacity: "0.7",
    borderRadius: "10px",
    padding: "4px",
    // position:'relative'
  },
  boton: {
    position: "relative",
    opacity: "0.8",
    padding: "3px",
    backgroundColor: "#CCCCCC",
    borderRadius: "10px",
    outline: "0",
    border: "0",
    cursor: "pointer",
  },
};

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerInput = (e) => {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
    console.log(name);
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
    <div style={styles.contenedor}>
      <input
        style={styles.input}
        type="text"
        placeholder="search country..."
        value={name}
        onChange={(e) => handlerInput(e)}
      ></input>
      <button
        style={styles.boton}
        type="submit"
        onClick={(e) => handlerButton(e)}
      >
        Search
      </button>
    </div>
  );
}
