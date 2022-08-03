import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_POPULATION = "FILTER_POPULATION";
export const FILTER_SORT = "FILTER_SORT";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const GET_BY_NAME = "GET_BY_NAME";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_CONTINENTS = "GET_CONTINENTS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_BY_ACTIVITY = "GET_BY_ACTIVITY"
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
export function getByActivity(payload){
  return {
    type: GET_BY_ACTIVITY,
    payload
  }
}
export function getActivities() {
  return async function (dispatch) {
    const json = await axios.get("http://www.localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: json.data.activities,
    });
  };
}
export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://www.localhost:3001/country",
      payload
    );
    // console.log(response);
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
export function getContinents() {
  return async function (dispatch) {
    const resp = await axios.get("http://www.localhost:3001/country");
    {
      console.log(resp.data);
    }
    return dispatch({
      type: GET_CONTINENTS,
      payload: resp.data.continent,
    });
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://www.localhost:3001/country/${id}`);
      console.log(id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function clearDetail(payload) {
  return {
    type: CLEAR_DETAIL,
    payload,
  };
}
