import React from "react";

const styles = {
    ul: {
      display: "flex",
      listStyleType: "none",
      justifyContent: "center",
      margin: "0rem 10rem",
      borderRadius: "100px",
      backgroundColor: "rgba(80, 80, 80, 0.473)",
    },
    li: {
      padding: "8px",
      borderadius: "20%",
      cursor: "pointer",
    },
    a: {
      fontSize: "10px",
      textDecoration: "none",
      color: "white",
    },
  };

export default function Pagination({
  countriesPerPage,
  allCountries,
  pagination,
}) {
  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumber.push(i + 1);
  }
    return (
        <nav>
          <ul style={styles.ul}>
            {pageNumber &&
              pageNumber.map((number) => (
                <li style={styles.li} key={number}>
                  <a style={styles.a} onClick={() => pagination(number)}>
                    {number}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
  );
}
