const { Router } = require("express");
const {
  getById,
  getByName,
  getAllToDb,
} = require("../controllers/country");

const router = Router();

router.get("/", getAllToDb);
router.get("/:id", getById);
router.get("/search", getByName);

module.exports = router;
