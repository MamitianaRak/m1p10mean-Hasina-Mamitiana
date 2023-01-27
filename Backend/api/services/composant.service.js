const db=require("../models");

exports.getlistpieces = () => {
    return db.composant.distinct("pieces");
      };