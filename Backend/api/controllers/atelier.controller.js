const { voiture } = require("../models");
const db = require("../models");
const serviceMail = require("../services/email.service");
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
      }
      var reparation = {
        "dateEntree": null,
        "dateSortie": null,
        "composants": req.body.composant,
        "prixMo": 0,
        "avancement": 0,
        "prixTotal": prixTotal,
        "datePayement": null,
        "bonSortie": false
      };
      voiture.depots[voiture.depots.length - 1].validation = 1;
      voiture.reparation.push(reparation);
      voiture.save();
      serviceMail.sendEmailDiagnostique(req, res);
      res.status(200).send(voiture);
    })
}

exports.getComposant = (req, res) => {
  Composant.find().exec((err, composant) => {
    if (err) res.status(500).send({ message: err });
    res.status(200).send(composant);
  })
}



