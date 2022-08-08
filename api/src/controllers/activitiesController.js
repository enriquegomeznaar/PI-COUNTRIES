const db = require("../db");
const Country = require("../models/Country");

const activitiesController = {
  create: async function (req, res) {
    const { name, difficulty, duration, seasons, countriesId } = req.body;
    console.log(req.body, "body");
    try {
      const newActivity = await db.Activities.create({
        name,
        difficulty,
        duration,
        seasons,
      });
      countriesId.forEach(async (country_id) => {
        const newCountry = await db.Country.findByPk(country_id);
        await newActivity.addCountry(newCountry);
      });
      res.status(201).end();
    } catch (error) {
      res.status(400).json({
        message: "Error al crear la actividad " + error,
        statusCode: 400,
      });
    }
  },
  list: async function (req, res) {
    try {
      const activities = await db.Activities.findAll({
        include: [{ model: db.Country }],
      });
      res.status(200).json({ message: "OK", statusCode: 200, activities });
    } catch (error) {
      res.status(400).json({ message: error, statusCode: 400 });
    }
  },
};

module.exports = activitiesController;
