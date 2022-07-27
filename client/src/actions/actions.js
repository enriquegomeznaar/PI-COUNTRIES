import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_POPULATION = "FILTER_POPULATION"
export const FILTER_SORT = "FILTER_SORT"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"

export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://www.localhost:3001/country");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}
export function filterSort(payload){
    return {
        type: FILTER_SORT,
        payload
    }
}

export function filterPopulation(payload){
    return {
        type: FILTER_POPULATION,
        payload
    }
}

export function filterByContinent(payload){
  return {
    type: FILTER_BY_CONTINENT,
    payload
  }
}
