const { authJwt } = require("../middlewares");
const controller = require("../controllers/finance.controller");
const controller2 = require("../controllers/depense.controller");
const express = require("express");


const router = express.Router();

router.get("/stat",[authJwt.verifyToken],controller.getStat);
router.post("/depense",[authJwt.verifyToken],controller2.saveDepense);

module.exports = router;