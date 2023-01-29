const db=require("../models");

exports.getListVoituresNonpayer = (keyword1,keyword) => {
    return db.voiture.aggregate([
        { $unwind: "$reparation" },
        {$match: { 
            "reparation.datePayement" : null,"reparation.avancement" : 100, "client.email": {$regex:".*(?i)"+keyword+".*"},"immatriculation": {$regex:".*(?i)"+keyword1+".*"}
            }
         },
         { $project: {depots: 0} }
        ]);
}


exports.payer = (req,res) => {
   
      db.voiture.updateOne({immatriculation : req.params.imm, "reparation.avancement" : 100,"reparation.datePayement" : null}, { $set: {"reparation.$.datePayement" : req.body.date}},function(err,updated){
        if(err){
           res.status(500).send(err);
        }else{
           res.json("Payement validé");
        }
      });;

}

