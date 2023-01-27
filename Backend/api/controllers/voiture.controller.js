const { now } = require("mongoose");
const db = require("../models");
const Voiture = db.voiture;
const service = require("../services/voiture.service");

exports.creationVoiture = (req, res) => {
    Voiture.findOne({
        immatriculation: req.body.immatriculation,
    }).exec((err, retour) => {
        if (!retour) {
            const voiture = new Voiture({
                immatriculation: req.body.immatriculation,
                marque: req.body.marque,
                client: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email
                },
            });
            voiture.save((err, voiture) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send(voiture);
            });
        } else {
            retour.immatriculation = '0';
            res.status(200).send(retour);
        }

    })
};

exports.depotVoiture = (req, res) => {
    Voiture.findOne({
        immatriculation: req.body.immatriculation,
    })
        .exec((err, voiture) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            var depot = { "dateDepot": Date.now(), "dateSortie": null, "signalements": req.body.signalement, "validation": 0, "reparation.avancement": 0 };
            voiture.depots.push(depot);
            voiture.save();
            res.status(200).send({ message: voiture });
        });
}



exports.getListeVoiture = (req, res) => {
    Voiture.find({
        "client.email": req.body.email,
    })
        .exec((err, voiture) => {
            if (err) res.status(500).send({ message: err });
            res.status(200).send(voiture);
        })
}

exports.findDepotVoiture = (req, res) => {
    Voiture.find({
        $expr: {
            $ne: [{
                $arrayElemAt: ["$depots.dateSortie", -1]
            }, null]
        },
        "client.email": req.body.email
    })
        .exec((err, voiture) => {
            if (err) res.status(500).send({ message: err });
            res.send(voiture);
        })
}

exports.deleteComposant = (req, res) => {
    Voiture.findOne({
        immatriculation: req.body.immatriculation,
    })
        .exec((err, voiture) => {
            if (err) res.status(500).send({ message: err });
            for (let i = 0; i < voiture.reparation[voiture.reparation.length - 1].composants.length; i++) {
                if (req.body.composant == voiture.reparation[voiture.reparation.length - 1].composants[i].nom) {
                    for (let j = 0; j < voiture.reparation[voiture.reparation.length - 1].composants[i].pieces.length; j++) {
                        voiture.reparation[voiture.reparation.length - 1].prixTotal -= voiture.reparation[voiture.reparation.length - 1].composants[i].pieces[j].prix;
                    }
                    voiture.reparation[voiture.reparation.length - 1].composants.splice(i, 1);
                }
            }
            voiture.save();
            res.send(voiture);
        })
}

exports.validationAttente = (req, res) => {
    Voiture.findOne({
        immatriculation: req.body.immatriculation,
    })
        .exec((err, voiture) => {
            if (err) res.status(500).send({ message: err });
            voiture.depots[voiture.depots.length - 1].validation = 2;
            voiture.save();
            res.send(voiture);
        })
}
exports.getListeVoiturePage = async (req, res) => {
    try {
        const { page = 1, limit = 2, kw = "" } = req.query;
        const docs = await service.getListVoiturePage(req, kw).skip((page - 1) * limit).limit(limit * 1).exec();
        const count = await service.getListVoiturePage(req, kw).count("count");
        if (count.length == 0) return res.send();
        res.json({
            docs,
            totalPages: Math.ceil(count[0].count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

exports.recuperationVoiture = (req, res) => {
    Voiture.findOne({
        immatriculation: req.body.immatriculation,
    }).exec((err, voiture) => {
        if (err) res.status(500).send({ message: err });
        voiture.depots[voiture.depots.length - 1].dateSortie = Date.now();
        voiture.depots[voiture.depots.length - 1].validation = 3;
        voiture.save();
        res.send(voiture);
    })
}

