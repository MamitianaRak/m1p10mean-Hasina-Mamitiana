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

router.post("/creation", controller.creationVoiture);
router.post("/depot", controller.depotVoiture);
router.post("/findDepot", controller.findDepotVoiture);
router.post("/liste", controller.getListeVoiture);
router.post("/deleteComposant", controller.deleteComposant);
router.get("/nonPayer", controller1.getListVoituresNonpayer);
router.post("/validationAttente", controller.validationAttente);
router.put("/payement/:imm", controller1.payer);

router.get("/reparation", controller2.getListVoituresReparation);

router.get("/:imm/reparation", controller2.getVoitureReparation);

router.put("/:imm/reparation/compDateDebut", controller2.updateDateDebutrep);

router.put("/:imm/reparation/compDatefin", controller2.updateDateFinavrep);

router.get("/bonsortie", controller2.getListVoituresNovalBon);

router.put("/:imm/reparation/validerBon", controller2.validerBonvoiture);

router.get("/:imm/historique", controller2.getListVoituresReparer);

router.get("/:imm/historique/:date", controller2.getListVoituresReparerDetails);

router.post("/recuperation", controller.recuperationVoiture);



module.exports = router;