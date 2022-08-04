import React from "react";
import pagination from "./pagination.css"

export default function Pagination({
  countriesPerPage,
  allCountries,
  pagination,
}) {
  const pageNumber = [];
  
  for (let i = 0; i <= Math.floor(allCountries / countriesPerPage); i++) {
    pageNumber.push(i + 1);
  }
    return (
        <nav>
          <ul className="ul">
            {pageNumber &&
              pageNumber.map((number) => (
                <li className="li" key={number}>
                  <a className="a" onClick={() => pagination(number)}>
                    {number}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
  );
}
