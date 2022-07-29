import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  filterPopulation,
  filterSort,
  getCountries,
} from "../actions/actions";
import Card from "./card";
import Pagination from "./pagination";
import SearchBar from "./searchBar";
const styles = {
  h1: {
    fontSize: "80px",
    margin: "0px",
    color: "black",
    position: "relative",
    letterSpacing: "5px",
    textShadow: "5px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
  },
  link: {
    color: "#CCCCCC",
    fontSize: "20px",
    borderRadius: "20px",
    padding: "10px",
    letterSpacing: "5px",
    fontWeight:'bold',
    textDecoration:'none',
    border:'1px solid #ccc',
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
  },
  botonReload: {
    borderRadius: "10px",
    outline: "none",
    padding: "3px 10px",
    cursor: "pointer",
    border:'none'
  },
};
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
  // useEffect(()=>{

  // }, [allCountries])

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  useEffect(()=>{
    console.log(allCountries,'allcountries')
  }, [allCountries])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1)
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
      <h1 style={styles.h1}>Country Page</h1>

      <div style={styles.navbar}>
        <Link style={styles.link} to="/form">
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
          <button
          onClick={(e) => {
            handleClick(e);
          }}
          style={styles.botonReload}
        >
          Reaload
        </button>
        </div>
      </div>

      <div style={styles.cards}>
        {currentCountries?.length
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
  );
}
