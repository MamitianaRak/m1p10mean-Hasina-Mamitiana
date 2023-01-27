const db=require("../models");


exports.getchiAffMois = () => {
   return  db.voiture.aggregate([
        { $unwind: "$reparation" },
        {"$match": { 
                "$expr": { 
                    "$eq": [ 
                        {$month: "$reparation.datePayement" }, 
                       {$month: new Date()} 
                    ] 
                } 
            }
         },
          {
           $group: {
              _id: null,
               chiffreAffairesMois: { $sum: "$reparation.prixTotal" }
            }
          }
    ]);
 }


 exports.getchiAffAn = () => {
    return  db.voiture.aggregate([
        { $unwind: "$reparation" },
        {"$match": { 
                "$expr": { 
                    "$eq": [ 
                        {$year: "$reparation.datePayement" }, 
                       {$year: new Date()} 
                    ] 
                } 
            }
         },
          {
           $group: {
              _id: null,
               chiffreAffairesAn: { $sum: "$reparation.prixTotal" }
            }
          }
    ]);
 }


 exports.getdepenseMois = () => {
    return  db.depense.aggregate([
        {"$match": { 
            "$expr": { 
                "$eq": [ 
                    {$month: "$dateDepense" }, 
                   {$month: new Date()} 
                ] 
            } 
        }
     },
      {
        $group: {
          _id: null,
          totalDepensesMois: { $sum: '$montant' }
        }
      }
    ]);
 }


 exports.getdepenseAn = () => {
    return  db.depense.aggregate([
        {"$match": { 
            "$expr": { 
                "$eq": [ 
                    {$year: "$dateDepense" }, 
                   {$year: new Date()} 
                ] 
            } 
        }
     },
      {
        $group: {
          _id: null,
          totalDepensesAn: { $sum: '$montant' }
        }
      }
    ]);
 }


 exports.getStatchiffreA = () => {
    return  db.voiture.aggregate(
        [
            { $unwind: "$reparation" },
            {"$match": { 
                "$expr": { 
                    "$eq": [ 
                        {$year: "$reparation.datePayement" }, 
                       {$year: new Date()} 
                    ]}}},
                { '$group': {
                    '_id': null,
                    'janvier': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },1]}, "$reparation.prixTotal", 0]}},
                    'fevrier': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },2]}, "$reparation.prixTotal", 0]}},
             'mars': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },3]}, "$reparation.prixTotal", 0]}},
             'avril': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },4]},  "$reparation.prixTotal", 0]}},
             'mai': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },5]},"$reparation.prixTotal" , 0]}},
             'juin': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },6]}, "$reparation.prixTotal", 0]}},
             'juillet': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" },7 ]}, "$reparation.prixTotal", 0]}},
             'aout': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" }, 8]}, "$reparation.prixTotal", 0]}},
             'septembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" }, 9]},"$reparation.prixTotal" , 0] }},
             'octobre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" }, 10]}, "$reparation.prixTotal", 0]}},
             'novembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" }, 11]},"$reparation.prixTotal" , 0] }},
             'decembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$reparation.datePayement" }, 12]}, "$reparation.prixTotal", 0]}},
        }}]
    );
 }

 exports.getStatdepense = () => {
    return  db.depense.aggregate(
        [
            {"$match": { 
                "$expr": { 
                    "$eq": [ 
                        {$year: "$dateDepense" }, 
                       {$year: new Date()} 
                    ]}}},
                { '$group': {
                    '_id': null,
                    'janvier': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 1]}, "$montant", 0]}},
                    'fevrier': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 2]}, "$montant", 0]}},
             'mars': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 3]}, "$montant", 0]}},
             'avril': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 4]},"$montant", 0]}},
             'mai': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 5]}, "$montant", 0]}},
             'juin': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 6]}, "$montant", 0]}},
             'juillet': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 7]}, "$montant", 0]}},
             'aout': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 8]}, "$montant", 0]}},
             'septembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 9]}, "$montant", 0] }},
             'octobre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 10]},"$montant", 0]}},
             'novembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 11]},"$montant" , 0] }},
             'decembre': { 
                        '$sum': {
                            '$cond': [{ $eq: [ {$month: "$dateDepense" }, 12]}, "$montant", 0]}},
        }}]
    );
 }

 exports.getAvgReparation= (imm) => {
    return db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            "reparation.avancement" : 100
            }
         },
         {
            $group:
               {
                   _id: null,
                   averageTime:
                      {
                         $avg:
                            {
                               $dateDiff:{
                                startDate:"$reparation.dateEntree",
                             endDate: "$reparation.dateSortie",
                             unit: "second",
                             timezone: "Europe/Moscow",
                                  }
                             }
                      }
               }
         },
         {
            $project:
               {
                  _id: 0
               }
          }
    ]);
   
}

     