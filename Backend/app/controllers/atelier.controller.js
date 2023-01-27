const { voiture } = require("../models");
const db = require("../models");
const Voiture = db.voiture;
const Composant = db.composant;

exports.getVoitureDiagnostique = (req, res) => {
  Voiture.find({
    $expr: {
      $and: [
        {
          $eq: [{
            $arrayElemAt: ["$depots.dateSortie", -1]
          }, null]
        }
      ]
    }
  })
    .exec((err, voiture) => {
      if (err) res.status(500).send({ message: err });
      res.status(200).send(voiture);
    });
}

exports.diagnostique = (req, res) => {
  Voiture.findOne({
    immatriculation: req.body.immatriculation,
  })
    .exec((err, voiture) => {
      if (err) res.status(500).send({ message: err });
      let prixTotal = 0;
      for (let i = 0; i < req.body.composant.length; i++) {
        for (let j = 0; j < req.body.composant[i].pieces.length; j++) {
          prixTotal += parseInt(req.body.composant[i].pieces[j].prix);
        }
        prixTotal = parseInt(prixTotal) + parseInt(req.body.prixMo);
      }
      var reparation = {
        "dateEntree": null,
        "dateSortie": null,
        "composants": req.body.composant,
        "prixMo": req.body.prixMo,
        "avancement": 0,
        "prixTotal": prixTotal,
        "datePayement": null,
        "bonSortie": false
      };
      voiture.depots[voiture.depots.length - 1].validation = 1;
      voiture.reparation.push(reparation);
      voiture.save();
      res.status(200).send(voiture);
    })
}

exports.getComposant = (req, res) => {
  Composant.find().exec((err, composant) => {
    if (err) res.status(500).send({ message: err });
    res.status(200).send(composant);
  })
}



