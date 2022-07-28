import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_POPULATION = "FILTER_POPULATION";
export const FILTER_SORT = "FILTER_SORT";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const GET_BY_NAME = "GET_BY_NAME";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://www.localhost:3001/country");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}
export function getByName(payload) {
  return async function (dispatch) {
    const json = await axios.get(
      `http://www.localhost:3001/country/search?name=${payload}`
    );
    return dispatch({
      type: GET_BY_NAME,
      payload: json.data,
    });
  };
}
export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://www.localhost:3001/country",
      payload
    );
    console.log(response);
    return response;
  };
}
export function filterSort(payload) {
  return {
    type: FILTER_SORT,
    payload,
  };
}

export function filterPopulation(payload) {
  return {
    type: FILTER_POPULATION,
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}
