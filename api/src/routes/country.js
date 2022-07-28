const { Router } = require("express");
const { getById, getByName, getAllToDb } = require("../controllers/country");

const router = Router();

router.get("/", getAllToDb);
router.get("/search", getByName);
router.get("/:id", getById);

module.exports = router;
