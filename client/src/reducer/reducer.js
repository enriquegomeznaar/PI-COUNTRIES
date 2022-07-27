import {
  FILTER_BY_CONTINENT,
  FILTER_POPULATION,
  FILTER_SORT,
  GET_COUNTRIES,
} from "../actions/actions";
const initialState = {
  countries: [],
  allCountries: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
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
      const sortPop =
        action.payload === "hi"
          ? state.allCountries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (a.population < b.population) {
                return 1;
              }
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (a.population < b.population) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        countries: action.payload === "default" ? state.allCountries : sortPop,
      };
    case FILTER_BY_CONTINENT:
      const allCountries = state.countries;
      const filterByContinent =
        action.payload === "default"
          ? allCountries
          : allCountries.filter((c) =>
              c.continent
                ? c.continent.includes(action.payload)
                : c.allCountries.map((t) => t.name).includes(action.payload)
            );
      return {
        ...state,
        countries: filterByContinent,
      };

    default:
      return state;
  }
}
// case FILTER_BY_TYPES:
//       const allPokemons = state.allPokemons;
//       const filterTypes =
//         action.payload === "default"
//           ? allPokemons
//           : allPokemons.filter((t) =>
//               t.type
//                 ? t.type.includes(action.payload)
//                 : t.pokemonTypes.map((t) => t.name).includes(action.payload)
//             );
//       return {
//         ...state,
//         pokemons: filterTypes,
//       };
