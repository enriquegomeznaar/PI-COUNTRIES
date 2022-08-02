const db = require("../db");
const Country = require("../models/Country");

const activitiesController = {
  create: async function (req, res) {
    const {name, difficulty, duration, seasons, countryId} = req.body
    console.log(req.body,"body")
    try {
       const newActivity = await db.Activities.create({name,difficulty,duration,seasons})
       const country = await db.Country.findByPk( countryId )
       console.log(country)
       newActivity.addCountry(country)
       res.status(200).json({message:'Created', statusCode:200, newActivity})
    } catch (error) {
        res.status(400).json({message:'Error al crear la actividad ' + error, statusCode:400})
    }
  },
  list: async function (req, res) {
    try {
        const activities = await db.Activities.findAll({include: [{model: db.Country}]})
        res.status(200).json({message:'OK', statusCode:200, activities})

    } catch (error) {
        res.status(400).json({message: error, statusCode:400})
    }
  },
  details: async function (req, res) {
    
  },
  delete: async function (req, res){

  },
  edit: async function (req, res){

  },
};

module.exports= activitiesController