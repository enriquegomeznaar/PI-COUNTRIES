import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  filterPopulation,
  filterSort,
  getActivities,
  getByActivity,
  getContinents,
  getCountries,
} from "../../actions/actions";
import Card from "../cards/card";
import Pagination from "../pagination/pagination";
import SearchBar from "../searchBar/searchBar";
import home from "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const continents = useSelector(state => state.continents)
  console.log(continents)
  const activities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastIndexCountry = currentPage * countriesPerPage; // 10
  const firstIndexCountry = lastIndexCountry - countriesPerPage; // 0
  const currentCountries = allCountries?.slice(
    firstIndexCountry,
    lastIndexCountry
  );
  const [orden, setOrden] = useState("");
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    // dispatch(getContinents())
    dispatch(getActivities());
  }, [dispatch]);
  // useEffect(() => {}, [activities]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
  };

  const getCountriesByActivity = (e) => {
    const id = e.target.value;
    dispatch(getByActivity(id));
  };

  const handlerFilterByPopulation = (e) => {
    e.preventDefault();
    dispatch(filterPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };
  const handlerFilterSort = (e) => {
    e.preventDefault();
    dispatch(filterSort(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };
  const handlerFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <div>
      <h1 className="h1">Country Page</h1>

      <div className="navbar">
        <Link className="link" to="/form">
          Create activity
        </Link>
        <div>
          <SearchBar />
        </div>
        <div>
          <select onChange={(e) => handlerFilterSort(e)}>
            <option value="default">Order by name</option>
            <option value="asc">Upward</option>
            <option value="desc">Falling</option>
          </select>
          <select onChange={(e) => handlerFilterByPopulation(e)}>
            <option value="default">Population</option>
            <option value="high">Higher</option>
            <option value="low">Lower</option>
          </select>
          <select onChange={(e) => handlerFilterByContinent(e)}>
            <option value="default">Continent</option>
            {continents?.map((c, i) => {
              console.log(continents)
              return (
                <option value={c.continent} key={i}>
                  {c.continent[0].toUpperCase() + c.continent.slice(1)}
                </option>
              );
            })}
          </select>
          <select onChange={(e) => getCountriesByActivity(e)}>
            <option value="default">Activities</option>
            {activities &&
              activities.map((a) => {
                return <option value={a.id}>{a.name}</option>;
              })}
          </select>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className="buttonReload"
          >
            Reaload
          </button>
        </div>
      </div>

      <div className="cards">
        {currentCountries?.length
          ? currentCountries.map((c) => {
              return (
                <Link to={`/detail/${c.id}`}>
                  <Card name={c.name} flag={c.flag} continent={c.continent} />
                </Link>
              );
            })
          : "Loading..."}
      </div>
      <Pagination
        allCountries={allCountries?.length}
        pagination={pagination}
        countriesPerPage={countriesPerPage}
      />
    </div>
  );
}
