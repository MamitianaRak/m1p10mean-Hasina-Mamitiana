const db=require("../models");

exports.getListVoiturePage = (req,keyword) => {

    return db.voiture.aggregate([
        {
            $match:{
                "client.email":req.body.email, "immatriculation": {$regex:".*(?i)"+keyword+".*"}
            }
        },
        {
            $project: {_id : 0, immatriculation : "$immatriculation" , marque : "$marque" , count: { $size:"$reparation" }}
        }
    ])
   
}


