import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { postActivity } from "../../services/activities";
import form from "./form.css";

export default function Form() {
  // const dispatch = useDispatch();
  const history = useHistory();

  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    seasons: "",
    countriesId: [],
  });
  const [countryName, setCountryName] = useState([]);
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
    let names = Array.from(e.target.selectedOptions, (option) => option.text);
    setCountryName([...countryName, ...names]);
    setInput({
      ...input,
      [e.target.name]: [...input.countriesId, ...options],
    });
  };

  const removeFromList = (country) => {
    const countryId = countries.find((c) => c.name === country).id;
    const newCountriesId = input.countriesId.filter((c) => c !== countryId);
    setInput({
      ...input,
      countriesId: newCountriesId,
    });
    setCountryName(countryName.filter((c) => c !== country));
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
    } else if (input.countriesId.length === 0) {
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
    <div className="div-form">
      <Link to="/home">Go back</Link>
      <h1>Create your activity</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <div>
          <label>Activity name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className="input-box"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Difficulty: </label>
          <input
            type="number"
            name="difficulty"
            min="1"
            max="5"
            onChange={(e) => handleChange(e)}
            value={input.difficulty}
            className="input-box"
          />
          {errors.difficulty && <p className="error">{errors.difficulty}</p>}
        </div>
        <div>
          <label className="label">Duration: </label>
          <input
            type="time"
            name="duration"
            onChange={(e) => handleChange(e)}
            value={input.duration}
            className="input-box"
          />
          {errors.duration && <p className="error">{errors.duration}</p>}
        </div>
        <div>
          <label className="label">Season </label>

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
          <label className="label">Where?</label>
          <select
            onChange={handlerOnChangeSelect}
            multiple={true}
            name="countriesId"
            value={input.countriesId}
            className="select-country"
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
      <ul id="selectedCountry">
        {countryName.map((country) => (
          <li>
            <div>
              {country}{" "}
              <button onClick={() => removeFromList(country)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
