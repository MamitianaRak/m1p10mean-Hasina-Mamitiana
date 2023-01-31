const { authJwt } = require("../middlewares");
const controller = require("../controllers/voiture.controller");
const controller1 = require("../controllers/payement.controller");
const controller2 = require("../controllers/reparation.controller");
const express = require("express");

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Origin, Content-Type, Accept"
    );
    next();
  });

router.post("/creation",[authJwt.verifyToken], controller.creationVoiture);
router.post("/depot",[authJwt.verifyToken], controller.depotVoiture);
router.post("/findDepot",[authJwt.verifyToken], controller.findDepotVoiture);
router.post("/liste",[authJwt.verifyToken], controller.getListeVoiture);
router.post("/deleteComposant",[authJwt.verifyToken], controller.deleteComposant);
router.get("/nonPayer",[authJwt.verifyToken], controller1.getListVoituresNonpayer);
router.post("/validationAttente",[authJwt.verifyToken], controller.validationAttente);
router.put("/payement/:imm",[authJwt.verifyToken], controller1.payer);

router.get("/reparation",[authJwt.verifyToken], controller2.getListVoituresReparation);

router.get("/:imm/reparation",[authJwt.verifyToken], controller2.getVoitureReparation);

router.put("/:imm/reparation/compDateDebut", controller2.updateDateDebutrep);

router.put("/:imm/reparation/compDatefin",[authJwt.verifyToken], controller2.updateDateFinavrep);

router.get("/bonsortie",[authJwt.verifyToken], controller2.getListVoituresNovalBon);

router.put("/:imm/reparation/validerBon",[authJwt.verifyToken], controller2.validerBonvoiture);

router.get("/:imm/historique",[authJwt.verifyToken], controller2.getListVoituresReparer);

router.get("/:imm/historique/:date",[authJwt.verifyToken], controller2.getListVoituresReparerDetails);

router.post("/recuperation",[authJwt.verifyToken], controller.recuperationVoiture);



module.exports = router;