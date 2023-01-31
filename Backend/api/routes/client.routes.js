const { authJwt } = require("../middlewares");
const controller = require("../controllers/voiture.controller");
const express = require("express");


const router = express.Router();

//router.get("/testa", [authJwt.verifyToken], controller.clienttest);

router.post("/voiture",[authJwt.verifyToken], controller.getListeVoiturePage);

module.exports = router;