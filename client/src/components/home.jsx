import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, filterPopulation, filterSort, getCountries } from "../actions/actions";
import Card from "./card";
import Pagination from "./pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
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
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
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
  const handlerFilterByContinent = e =>{
    e.preventDefault();
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/form">Create activity</Link>
      <h1>Country Page</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reaload
      </button>
      <div>
        <div>
          <select onChange={(e) => handlerFilterSort(e)}>
            <option value="default">Order by name</option>
            <option value="asc">Upward</option>
            <option value="desc">Falling</option>
          </select>
          <select onChange={(e) => handlerFilterByPopulation(e)}>
            <option value="default">Population</option>
            <option value="hi">Higher</option>
            <option value="lo">Lower</option>
          </select>
          <select onChange={e => handlerFilterByContinent(e)}>
            <option value="default">Continent</option>
            {allCountries?.map((c, i) => {
              return (
                <option value={c.continent} key={i}>
                  {c.continent[0].toUpperCase() + c.continent.slice(1)}
                </option>
              );
            })}
          </select>
          <select>
            <option value="default">Activities</option>
          </select>
        </div>

        <div>
          {currentCountries.length
            ? currentCountries.map((c) => {
                return (
                  <Card name={c.name} flag={c.flag} continent={c.continent} />
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
    </div>
  );
}
