const { authJwt } = require("../middlewares");
const controller = require("../controllers/atelier.controller");
const express = require("express");


const router = express.Router();

router.get("/diagnostique/liste",[authJwt.verifyToken],controller.getVoitureDiagnostique);
router.post("/diagnostique",[authJwt.verifyToken],controller.diagnostique);
router.get("/composant",[authJwt.verifyToken],controller.getComposant);

module.exports = router;