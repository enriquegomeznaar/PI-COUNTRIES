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
      case FILTER_BY_CONTINENT:
        console.log(action,"action")
        
        return {
          ...state,
          continents: action.payload
          
        }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

      case GET_DETAIL:
        console.log(action,"action")
        return{
          ...state,
          details: action.payload[0],
        }
        case CLEAR_DETAIL:
      return {
        ...state,
        details: [],
      };
    case GET_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
      case GET_BY_ACTIVITY:
         const id = action.payload
         const listActivity = state.activities.filter(a => a.id == id)
         console.log(action.payload)
         let countriesByActivity = listActivity[0].countries
         console.log(id)
        return{
          ...state,
          countries: countriesByActivity
        }
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
    // let sortPop = state.allCountries.sort(function (a, b) {
    //   return a.population - b.population;

    // });
    // if (action.payload === "low") sortPop = sortPop.reverse();
    // console.log(sortPop);
    // return {
    //   ...state,
    //   countries: sortPop,
    // };
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
