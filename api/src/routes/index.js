const { Router } = require("express");
const country = require("./country");
const activities = require("./activities");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/country", country);
router.use("/activities", activities);

module.exports = router;
