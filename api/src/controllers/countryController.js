const axios = require("axios");
const { Country, Activities } = require("../db");
const url = "https://restcountries.com/v3/all";
const { Op } = require("sequelize");
const db = require("../db");

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
      Country.create({
        id: el.id,
        name: el.name,
        flag: el.flag,
        continent: el.continent,
        capital: el.capital ? el.capital : "dont have any...",
        subregion: el.subregion ? el.subregion : "dont have any...",
        area: el.area,
        population: el.population,
      });
    });
   
  } catch (error) {
    next;
  }
}
async function getAllCountries(req, res) {
  const bdCountry = await Country.findAll({
    attributes: ["flag", "name", "continent", "population","id", "subregion","area","capital"],
  });
  res.send(bdCountry)
}

async function getByName(req, res) {
  const { name } = req.query;
  const response = await Country.findAll({
    where: { name: { [Op.startsWith]: name } },
  });
  res.send(response);
}

async function getById(req, res) {
  const { id } = req.params;
  const allCountries = await Country.findAll({
    include: [{model: db.Activities}],
    where: {id :id}
  })
  res.send(allCountries)
  }


module.exports = {
  getAllToDb,
  getById,
  getByName,
  getAllCountries
};
