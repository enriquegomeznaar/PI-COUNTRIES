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
    difficulty: "",
    duration: "",
    seasons: "",
    countriesId: [],
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSeason = (e) => {
    setInput({
      ...input,
      seasons: [...input.seasons, e.target.value],
    });
  };
  const handlerOnChangeSelect = (e) => {
    let options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInput({
      ...input,
      [e.target.name]: [...input.countriesId, ...options],
    });
    console.log(input.countriesId);
  };
  useEffect(() => {
    if (!input.name) {
      setDisableButton(true);
    } else if (!input.duration) {
      setDisableButton(true);
    } else if (!input.difficulty) {
      setDisableButton(true);
    } else if (!input.seasons) {
      setDisableButton(true);
    } else if (input.countriesId.length == 0) {
      setDisableButton(true);
    } else setDisableButton(false);
  }, [input]);
  const handlerSubmit = (e) => {
    e.preventDefault();
    input.seasons = input.seasons.toString();
    postActivity(input);
    alert("Activity created succesfully!");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      seasons: "",
      countriesId: [],
    });
    history.push("/home");
  };

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
            value="Summer"
            name="summer"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Spring:</label>
          <input
            type="checkbox"
            value="Spring"
            name="spring"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Winter:</label>
          <input
            type="checkbox"
            value="Winter"
            name="winter"
            onChange={(e) => handleChangeSeason(e)}
          />
          <label> Fall:</label>
          <input
            type="checkbox"
            value="Fall"
            name="fall"
            onChange={(e) => handleChangeSeason(e)}
          />
        </div>
        <div>
          <label style={styles.label}>Where?</label>
          <select
            onChange={handlerOnChangeSelect}
            multiple={true}
            name="countriesId"
            value={input.countriesId}
          >
            {countries &&
              countries.map((country) => (
                <option value={country.id}>{country.name}</option>
              ))}
          </select>
        </div>
        <div>
          <button type="submit" disabled={disableButton}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
