const { authJwt } = require("../middlewares");
const controller = require("../controllers/atelier.controller");
const express = require("express");


const router = express.Router();

router.get("/diagnostique/liste",controller.getVoitureDiagnostique);
router.post("/diagnostique",controller.diagnostique);
router.get("/composant",controller.getComposant);

module.exports = router;