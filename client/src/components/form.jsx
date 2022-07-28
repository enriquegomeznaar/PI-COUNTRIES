import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity } from "../actions/actions";

export function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector((state) => state.activities);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: [],
    duration: 0,
    season: [],
  });

  const handleChange = (e) =>
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Activity created succesfully!");
    setInput({
      name: "",
      difficulty: [],
      duration: 0,
      season: [],
    });
    history.push("/home");
  };
  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Create your activity</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <div>
          <label>Activity name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <input
            type="text"
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={input.duration}
            name="duration"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Season:</label>
          <input
            type="text"
            value={input.season}
            name="season"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
