const mongoose = require("mongoose");

const Depense = mongoose.model(
  "Depense",
  new mongoose.Schema({
    motif: String,
      pieces: [ //facultatif
        {
          nom : String, //facultatif
          quantite: Number, //facultatif,
          prixUnitaire: Number //facultatif
        }
      ],
    montant: { type: Number, default: 0 },
    dateDepense: Date
  })
);

module.exports = Depense;