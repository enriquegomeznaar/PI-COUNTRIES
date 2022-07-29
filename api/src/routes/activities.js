const { Router } = require("express");
const activitiesController = require("../controllers/activitiesController");

const router = Router();

router.post("/", activitiesController.create);
router.get("/", activitiesController.list);
module.exports = router;
