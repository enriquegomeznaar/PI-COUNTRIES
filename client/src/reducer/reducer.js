import {
  FILTER_BY_CONTINENT,
  FILTER_POPULATION,
  FILTER_SORT,
  GET_COUNTRIES,
  GET_BY_NAME,
  POST_ACTIVITY,
  GET_ACTIVITIES,
  GET_DETAIL,
  GET_CONTINENTS,
  CLEAR_DETAIL,
  GET_BY_ACTIVITY,
  GET_FIVE
} from "../actions/actions";
const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  details: [],
  continents: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_CONTINENTS:
      return {
        ...state,
        continents: action.payload,
      };
  
    case FILTER_BY_CONTINENT:
      if (action.payload == "default") {
        return state;
      } else {
        let filterContinent = action.payload;

        const filterCountries = state.allCountries.filter(
          (country) => country.continent == filterContinent
        );
        return {
          ...state,
          countries: filterCountries,
        };
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        details: action.payload[0],
      };
    case GET_BY_ACTIVITY:
      const id = action.payload;
      const listActivity = state.activities.filter((a) => a.id == id);
      let countriesByActivity = listActivity[0].countries;
      return {
        ...state,
        countries: countriesByActivity,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case FILTER_SORT:
      const sortArr =
        action.payload === "asc"
          ? state.allCountries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        countries: action.payload === "default" ? state.allCountries : sortArr,
      };
    case FILTER_POPULATION:
      const filter = action.payload;
      switch (filter) {
        case "low":
          const copyState = { ...state };
          copyState.allCountries.sort(function (a, b) {
            return a.population - b.population;
          });

          return copyState;

        case "high":
          const copyState2 = { ...state };
          copyState2.allCountries.sort(function (a, b) {
            return b.population - a.population;
          });
          return copyState2;

        default:
          return state;
      }

    default:
      return state;
  }
}
