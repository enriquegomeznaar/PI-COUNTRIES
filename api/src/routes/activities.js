const { Router } = require("express");
const { Country, Activities } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  let { name, difficulty, duration, season, countryName } = req.body;
  let country = await Country.findAll({
    where: { name: countryName },
  });

  let newActivity = await Activities.create({
    name,
    difficulty,
    duration,
    season,
  });
  country = country[0];
  console.log(country);

  country.addActivities(newActivity);

  res.send("Created!");
});
module.exports = router;
