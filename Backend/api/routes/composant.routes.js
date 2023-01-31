const { authJwt } = require("../middlewares");
const controller = require("../controllers/composant.controller");
const express = require("express");


const router = express.Router();

router.get("/allPieces",[authJwt.verifyToken],controller.getlistpieces);

module.exports = router;