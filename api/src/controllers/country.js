const axios = require("axios");
const { Country, Activities } = require("../db");
const url = "https://restcountries.com/v3/all";

async function getApi() {
  try {
    const api = await axios.get(`${url}`);
    const apiInfo = api.data;
    const apiCountry = apiInfo.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[0],
        continent: c.continents[0],
        capital: c.capital ? c.capital.join() : null,
        subregion: c.subregion,
        area: c.area,
        population: c.population,
      };
    });
    console.log(apiCountry);
    return apiCountry;
  } catch (error) {
    console.log(error);
  }
}

async function getAllToDb(req, res) {
  const countryApi = await getApi();
  countryApi.forEach((el) => {
    Country.findOrCreate({
      where: {
        id: el.id,
        name: el.name,
        flag: el.flag,
        continent: el.continent,
        capital: el.capital ? el.capital : "dont have any...",
        subregion: el.subregion ? el.subregion : "dont have any...",
        area: el.area,
        population: el.population,
      },
    });
  });
  const bdCountry = await Country.findAll();
  const importantInfo = bdCountry.map((el) => {
    return {
      flag: el.flag,
      name: el.name,
      continent: el.continent,
    };
  });
  importantInfo.length
    ? res.status(200).send(importantInfo)
    : res.status(404).send("ERROR");
}
async function getByName() {
  const name = req.query.name;
  const countries = getAllToDb();
  const filteredCountries = countries.filter(
    (c) => c.name.toLowerCase() == name.toLowerCase()
  );
  console.log(filteredCountries);
  filteredCountries.length
    ? res.status(200).send(filteredCountries)
    : res.status(404).send("ERROR");
}
//   if (req.query.name) {
//     console.log("toy aca");
//     const searchCountry = importantInfo.filter(
//       (country) =>
//         //el.name.toLowerCase().includes(req.query.name.toLowerCase())
//         req.query.name.toLowerCase() == country.name.toLowerCase()
//     );
//     searchCountry.length
//       ? res.status(200).send(searchCountry)
//       : res.status(404).send("Dont match");
//   } else res.status(200).send(importantInfo);
// }

async function getById(req, res) {
  const { id } = req.params;
  const allCountries = await getAllToDb();
  if (id) {
    const idCountry = allCountries.filter((c) => c.id == id.toUpperCase());
    idCountry.length
      ? res.send(idCountry)
      : res.status(404).send("Country does not exist...");
  }
}

// async function getByName(req, res) {
//   const { name } = req.query;
//   const totalCountries = await getAllToDb();
//   if (name) {
//     const countryName = totalCountries.filter((el) => el.name == name);
//     console.log("estoy aca");
//     res.send(countryName);
//   } else {
//     //res.send(totalCountries);
//     console.log("algo esta mal");
//   }
//   // countryName = await axios.get(`https://restcountries.com/v3/name/${name}`)
// }

async function postActivity(req, res) {
  try {
    let { name, difficulty, duration, season, countryName } = req.body;
    let country = await Country.findAll({
      where: { name: countryName },
    });
    country=country[0] 
    console.log(country)

    let newActivity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });
    country.addActivities(newActivity);

    res.send("Created!");
    // console.log(actCreated);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllToDb,
  getById,
  getByName,
};

