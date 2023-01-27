const service = require("../services/depense.service");

exports.saveDepense =  (req, res) => {
     service.saveDepense(req.body,req,res);
      };