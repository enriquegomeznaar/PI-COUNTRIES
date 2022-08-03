import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDetail, getDetail } from "../actions/actions";
import { useEffect } from "react";
const styles={
  color:{
    color:"white"
  }
}
export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [country, setCountry] = useState({})
  let res = useSelector((state) => state.details);
  useEffect(() => {
    setCountry(res[0])
    dispatch(getDetail(id));
    // setCountry({})
  }, [dispatch]);
  useEffect(()=>{
    dispatch(clearDetail())
    setCountry(res[0])
  },[dispatch])
  useEffect(()=>{
    console.log(res, "res")
  })
  return (
    <div>
      <div>
        <Link to="/home">Go back</Link>
      </div>
      {res ? (
        <div>
          <h1 style={styles.color}>Name: {res.name}</h1>
          <h2 style={styles.color}>ID: {res.id}</h2>
          <h3 style={styles.color}>Continent: {res.continent}</h3>
          <img src={res.flag} alt="load" height="150px" width="200px"/>
          <h5 style={styles.color}>Area: {res.area}</h5>
          <h5 style={styles.color}>Population: {res.population}</h5>
          <h5 style={styles.color}>Subregion: {res.subregion}</h5>
          <h5 style={styles.color}>Capital: {res.capital}</h5>
          <h5 style={styles.color}>Activities: {res.activities?.map((a)=>{return a.name})}</h5>
          {/* activity */}
        </div>
      ) : (
        "Error"
      )}
    </div>
  );
}
