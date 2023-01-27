const mongoose = require("mongoose");

const Voiture = mongoose.model(
    "Voiture",
    new mongoose.Schema({
        immatriculation: String,
        marque: String,
        depots: [{
            _id: false,
            dateDepot: Date,
            dateSortie: Date,
            signalements: [], //listes noms Composants en String,
            validation: Number
        }],
        reparation: [{
            _id: false,
            dateEntree: Date,
            dateSortie: Date,
            composants: [{
                _id: false,
                nom: String,
                dateDebut: Date,
                dateFin: Date,
                pieces: [
                    {
                        _id: false,
                        nom: String,
                        prix: { type: Number, default: 0 }
                    }
                ]
            }],
            prixMo: { type: Number, default: 0 },
            avancement: { type: Number, default: 0 },   //pourcentage
            prixTotal: { type: Number, default: 0 },
            datePayement: Date,
            bonSortie: { type: Boolean, default: false }
        }],
        client:
            { nom: String, prenom: String, email: String }
    })
);

module.exports = Voiture;