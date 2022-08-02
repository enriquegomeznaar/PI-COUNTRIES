import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions/actions";
import { postActivity } from "../services/activities";

const styles = {
  label: {
    fontWeight: "bold",
  },
  error: {
    fontFamily: "Times new roman",
    color: "red",
    fontSize: "15px",
  },
};
export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: [],
    duration: 0,
    seasons: [],
    countryId: null,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleChangeSeason = (e) => {
    setInput({
      ...input,
      seasons: [...input.seasons, e.target.value],
    });
  };
  const handlerSelect = (e) => {
    const countryName = e.target.value;
    const country = countries.find((country) => country.name == countryName);
    setInput({
      ...input,
      countryId: country.id,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    input.seasons = input.seasons.toString();
    postActivity(input);
    alert("Activity created succesfully!");
    setInput({
      name: "",
      difficulty: [],
      duration: 0,
      season: [],
      countryId: null,
    });
    history.push("/home");
  };
  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "name is require";
    } else if (!input.difficulty) {
      errors.difficulty = "introduce the difficulty";
    } else if (!input.duration) {
      errors.duration = "introduce duration";
    } else if (!input.season) {
      errors.season = "select a season";
    }
    return errors;
  }

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Create your activity</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <div>
          <label style={styles.label}>Activity name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <label style={styles.label}>Difficulty: </label>
          <input
            type="number"
            name="difficulty"
            min="1"
            max="5"
            onChange={(e) => handleChange(e)}
            value={input.difficulty}
          />
          {errors.difficulty && <p style={styles.error}>{errors.difficulty}</p>}
        </div>
        <div>
          <label style={styles.label}>Duration: </label>
          <input
            type="time"
            name="duration"
            onChange={(e) => handleChange(e)}
            value={input.duration}
          />
          {errors.duration && <p style={styles.error}>{errors.duration}</p>}
        </div>
        <div>
          <label style={styles.label}>Season </label>

          <label> Summer:</label>
          <input
            type="checkbox"
            value="summer"
            name="summer"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Spring:</label>
          <input
            type="checkbox"
            value="spring"
            name="spring"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Winter:</label>
          <input
            type="checkbox"
            value="winter"
            name="winter"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Fall:</label>
          <input
            type="checkbox"
            value="fall"
            name="fall"
            onChange={(e) => handleChangeSeason(e)}
          />
        </div>
        <div>
          <label style={styles.label}>Where?</label>
          <select onChange={(e) => handlerSelect(e)}>
            {console.log(countries)}
            {countries.map((d) => (
              <option name={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
