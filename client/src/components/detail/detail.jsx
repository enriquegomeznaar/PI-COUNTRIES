import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDetail, getDetail } from "../../actions/actions";
import { useEffect } from "react";
import detail from "./detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [country, setCountry] = useState({});
  let res = useSelector((state) => state.details);
  useEffect(() => {
    setCountry(res[0]);
    dispatch(getDetail(id));
    console.log(res)
  }, [dispatch]);
  useEffect(() => {
    dispatch(clearDetail());
    setCountry(res[0]);
  }, [dispatch]);
  useEffect(() => {
    console.log(res, "res");
  });
  return (
    <div className="container-detail">
      
      {res ? (
        <div className="detail">
          <img src={res.flag} alt="load"  />
          <div>
            <h1 className="color">Name: {res.name}</h1>
            <h2 className="color">ID: {res.id}</h2>
            <h3 className="color">Continent: {res.continent}</h3>
            <h5 className="color">Area: {res.area}</h5>
            <h5 className="color">Population: {res.population}</h5>
            <h5 className="color">Subregion: {res.subregion}</h5>
            <h5 className="color">Capital: {res.capital}</h5>
            <h5>Borders:  { res.borders? res.borders : "No tiene fronteras..."}</h5>
            <h5 className="color">
              Activities:{" "}
              {res.activities?.map((a) => {
                return a.name;
              })}
            </h5>
          </div>
          {/* activity */}
        </div>
      ) : (
        "Error"
      )}
      <div className="btn-detail">
        <Link to="/home">Go back</Link>
      </div>
    </div>
  );
}
