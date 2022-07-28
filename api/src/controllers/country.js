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

async function getAllToDb(req, res, next) {
  try {
    
   
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
  importantInfo.length ? res.send(importantInfo) : res.send("ERROR");
  console.log(importantInfo)}
  catch (error) {
    next
  }
}

async function getByName(req, res) {
  const { name } = req.query;
  try {
    var countryName = await getAllToDb(name).filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("Country does't exist...");
  } catch (error) {
    console.log(error);
  }
}

async function getById(req, res) {
  const { id } = req.params;
  const allCountries = await getAllToDb();
  console.log(allCountries)
  if (id) {
    const idCountry = allCountries.filter((c) => c.id == id.toUpperCase());
    idCountry.length
      ? res.send(idCountry)
      : res.status(404).send("Country does't exist...");
  }
}

module.exports = {
  getAllToDb,
  getById,
  getByName,
};
