const db = require("../db");

const activitiesController = {
  create: async function (req, res) {
    const {name, difficulty, duration, seasons} = req.body
    try {
       const newActivity = await db.Activities.create({name,difficulty,duration})
       res.status(200).json({message:'Created', statusCode:200, newActivity})
    } catch (error) {
        res.status(400).json({message:'Error al crear la actividad ' + error, statusCode:400})
    }
  },
  list: async function (req, res) {
    try {
        const activities = await db.Activities.findAll()
        res.status(200).json({message:'OK', statusCode:200, activities})

    } catch (error) {
        res.status(400).json({message:'Error al listar la actividades ', statusCode:400})
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