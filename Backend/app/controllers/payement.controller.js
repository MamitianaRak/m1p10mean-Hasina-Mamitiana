const db = require("../models");
const service = require("../services/payement.service");


exports.getListVoituresNonpayer = async (req, res) => {
    try{

    const { page = 1, limit = 2, kw="", kw1="" } = req.query;
    const docs = await service.getListVoituresNonpayer(kw1,kw).skip((page-1) * limit).limit(limit * 1).exec();
    const count = await service.getListVoituresNonpayer(kw1,kw).count("count");
    if(count.length == 0)  return res.send();
    res.json({
        docs,
        totalPages: Math.ceil(count[0].count / limit),
        currentPage: parseInt(page)
    });
    }catch(error){
    res.status(500).send({ message: error });
}
}

exports.payer = async (req, res) => {

       service.payer(req,res);

}