const db=require("../models");
const Depense = require("../models/depense.model");

exports.saveDepense = (data,req,res) => {
    let voiture = new db.depense(data);
    voiture.save((err, dep) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Depense enregistrée" });
    });
      };