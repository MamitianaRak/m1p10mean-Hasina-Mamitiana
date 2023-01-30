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

 exports.getAvgReparation= async (imm) => {
    const list =  await db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            "reparation.avancement" : 100
            }
         },
         {
            $project:
               {
                _id:0,
                  "reparation.dateEntree":1,
                  "reparation.dateSortie":1
               }
          }

    ]);

   return calculAvgReparation(list);
}

    calculAvgReparation = (list) => {
    let val = 0;
    list.forEach(data => {
        val = val +calculseconds(data.reparation.dateEntree,data.reparation.dateSortie);
    });
    return val;
}

dateDiff_seconds = (x,y) =>{
    return Math.abs(x.getTime() - y.getTime())/1000;
}

    dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  calculseconds = (dateD,dateF) =>{
    const diff = dateDiffInDays(dateD,dateF);
    if(diff == 0){
      return dateDiff_seconds(dateD,dateF);
    }
      const date16h = new Date(dateD.getTime());
      date16h.setHours(16,0,0);
      const diffD = dateDiff_seconds(dateD,date16h);
      const date8h = new Date(dateF.getTime());
      date8h.setHours(8,0,0);
      const diffF = dateDiff_seconds(date8h,dateF);
      const middle = (diff -1)*8*60*60;
      const finalH = diffD+diffF+middle; 
      return finalH;
  }
