import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";


export default function Detail(props) {
  const dispatch = useDispatch();
  const id = useParams()

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const country = useSelector((state) => state.details);
  //   console.log(country)
  return (
    <div>
      <div>
        <Link to="/home">
          Go back
        </Link>
      </div>
      {country ? (
        <div>
          <h1>Name: {props.name}</h1>
          <h2>ID: {country.id}</h2>
          <h3>Continent: {country.continent}</h3>
          <img src={country.flag} alt="load" />
          <h5>Area: {country.area}</h5>
          <h5>Population: {country.population}</h5>
          <h5>Subregion: {country.subregion}</h5>
          <h5>Capital: {country.capital}</h5>
          {/* activity */}
        </div>
      ) : (
        "Error"
      )}
    </div>
  );
}
