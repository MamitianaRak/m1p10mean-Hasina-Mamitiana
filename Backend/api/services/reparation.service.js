const db=require("../models");
const serviceMail = require("../services/email.service");

exports.getListVoituresReparation = (keyword) => {
    return db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            "depots.validation" : 2,"reparation.avancement" : { $ne: 100} , "reparation.dateSortie" : null,"immatriculation": {$regex:".*(?i)"+keyword+".*"}
            }
         },
        { $sort : { "depots.dateDepot" : 1  } },
         { $project: {depots: 0, "reparation.composants": 0} }
    ]);
   
}



exports.getVoitureReparation = (imm) => {
    return db.voiture.aggregate([
        { $unwind: {
            path: "$reparation",
            includeArrayIndex: "idx"
        }},
        {
            $project: {
                _id: 0,
                reparation: 1,
                client:1,
                immatriculation:1,
                marque:1,
                depots: { $arrayElemAt: ["$depots", "$idx"] },
            }
        },
        {$match: { 
            "depots.validation" : 2,"reparation.avancement" : { $ne: 100} , "reparation.dateSortie" : null,"immatriculation": imm
            }
         }
    ]);
   
}

exports.updateDateDebutrep = (req,res) => {
    if(req.body.dateEntree != null){
        db.voiture.updateOne(
            {immatriculation : req.params.imm},
             { $set: {"reparation.$[reparation].composants.$[composant].dateDebut" :req.body.dateDebut,"reparation.$[reparation].dateEntree":req.body.dateEntree }},
             { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': req.body.nom  }]}
             ,function(err,updated){
            if(err){
               res.status(500).send(err);
            }else{
               res.json("composant mis à jour");
            }
          });

    }else{
        db.voiture.updateOne(
            {immatriculation : req.params.imm},
             { $set: {"reparation.$[reparation].composants.$[composant].dateDebut" :req.body.dateDebut }},
             { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': req.body.nom  }]}
             ,function(err,updated){
            if(err){
               res.status(500).send(err);
            }else{
               res.json("composant mis à jour");
            }
          });
    }

}

exports.updateDateFinrep = (req,res) => {
    if(req.body.dateSortie != null){
        db.voiture.updateOne(
            {immatriculation : req.params.imm},
            { $set: {"reparation.$[reparation].composants.$[composant].dateFin" :req.body.dateFin,"reparation.$[reparation].avancement" :req.body.avancement,"reparation.$[reparation].dateSortie":req.body.dateSortie,"reparation.$[reparation].prixMo":req.body.prixMo,"reparation.$[reparation].prixTotal":req.body.prixTotal }},
            { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': req.body.nom }]}
             ,function(err,updated){
          if(err){
             res.status(500).send(err);
          }else{
             //res.json("composant mis à jour");
            serviceMail.sendEmailReparation(req,res);
          }
        });

    }
    else{
        db.voiture.updateOne(
            {immatriculation : req.params.imm},
            { $set: {"reparation.$[reparation].composants.$[composant].dateFin" :req.body.dateFin,"reparation.$[reparation].avancement" :req.body.avancement,"reparation.$[reparation].prixMo":req.body.prixMo,"reparation.$[reparation].prixTotal":req.body.prixTotal }},
            { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': req.body.nom }]}
             ,function(err,updated){
          if(err){
             res.status(500).send(err);
          }else{
             res.json("composant mis à jour");
          }
        });

    }
   

}


exports.getListVoituresNovalBon = (keyword) => {
    return db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            "reparation.avancement" : 100 ,"reparation.datePayement":{ $ne: null },"reparation.bonSortie" :  false,"immatriculation": {$regex:".*(?i)"+keyword+".*"}
            }
         },
         { $project: {depots: 0, "reparation.composants": 0} }
    ]);
   
}

exports.validerBonvoiture= (req,res) => {
        db.voiture.updateOne(
            {immatriculation : req.params.imm,"reparation.bonSortie":false,"reparation.datePayement":{ $ne: null },"reparation.avancement" : 100 },
             { $set: {"reparation.$.bonSortie" :true}}
             ,function(err,updated){
            if(err){
               res.status(500).send(err);
            }else{
               res.json("composant mis à jour");
            }
          });
        
}

exports.getListVoituresReparer = (req,keyword) => {
    if(keyword != ''){
        return db.voiture.aggregate([
            { $unwind: "$reparation" },
            {$match: { 
                immatriculation : req.params.imm,"reparation.avancement" : 100 , "reparation.dateEntree": {'$lte': new Date(keyword)}, "reparation.dateSortie" : {'$gte': new Date(keyword) }
                }
             },
            { $sort : { "reparationt.dateSortie" : -1  } },
             { $project: {depots: 0, "reparation.composants": 0} }
        ]);
    }
    else{
        return db.voiture.aggregate([
            { $unwind: "$reparation" },
            {$match: { 
                immatriculation : req.params.imm,"reparation.avancement" : 100
                }
             },
            { $sort : { "reparationt.dateSortie" : -1  } },
             { $project: {depots: 0, "reparation.composants": 0} }
        ]);

    }
   
   
}


exports.getListVoituresReparerDetails = (req) => {
    
    return db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            immatriculation : req.params.imm,"reparation.avancement" : 100,"reparation.dateEntree": new Date(req.params.date)
            }
         }
    ]);
   
}




// db.voitures.updateOne(
//     {immatriculation :'2010TAA'},
//      { $set: {"reparation.$[reparation].composants.$[composant].dateDebut" : new Date()}},
//      { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': 'frein' }]}

//      )
//      ,function(err,updated){
//     if(err){
//        res.status(500).send(err);
//     }else{
//        res.json("composant mis à jour");
//     }
//   });


// db.voitures.updateOne(
//     {immatriculation : req.params.imm},
//      { $set: {"reparation.$[reparation].composants.$[composant].dateFin" :req.body.dateFin,"reparation.$[reparation].avancement" :req.body.avancement }},
//      { arrayFilters: [{ 'reparation.avancement':  { "$ne": 100 }},{ 'composant.nom': req.body.nom }]})


// db.voitures.aggregate([
//     { $unwind: "$reparation" },
//     {$match: { 
//         "reparation.avancement" :  100,"immatriculation": {$regex:".*(?i).*"}
//         }
//      },
//      { $project: {depots: 0, "reparation.composants": 0} }
// ])


// db.voitures.aggregate([
//     { $unwind: "$reparation" },
//     {$match: { 
//         immatriculation : '7845TG',"reparation.avancement" : 100
//         }
//      },
//     { $sort : { "reparationt.dateSortie" : -1  } },
//      { $project: {depots: 0, "reparation.composants": 0} }
// ]);

// db.voitures.aggregate([
//     { $unwind: "$reparation" },
//     {$match: { 
//         immatriculation : '7845TG',"reparation.avancement" : 100 , "reparation.dateEntree": {'$lte': new Date('2023-01-25T23:00:00') }
//         }
//      },
//     { $sort : { "reparationt.dateSortie" : -1  } },
//      { $project: {depots: 0, "reparation.composants": 0} }
// ]);


// db.voitures.aggregate([
//     { $unwind: {
//         path: "$reparation",
//         includeArrayIndex: "idx"
//     }},
//     {
//         $project: {
//             _id: 0,
//             reparation: 1,
//             client:1,
//             immatriculation:1,
//             marque:1,
//             depots: { $arrayElemAt: ["$depots", "$idx"] },
//         }
//     },
//     {$match: { 
//         "depots.validation" : 2,"reparation.avancement" : { $ne: 100} , "reparation.dateSortie" : null,"immatriculation": '2021TAA'
//         }
//      }
// ]);