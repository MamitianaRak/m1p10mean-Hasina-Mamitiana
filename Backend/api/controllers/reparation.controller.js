const db = require("../models");
const service = require("../services/reparation.service");
const serviceMail = require("../services/email.service");


exports.getListVoituresReparation = async (req, res) => {
    try{
        const { page = 1, limit = 2, kw="" } = req.query;
        const docs = await service.getListVoituresReparation(kw).skip((page-1) * limit).limit(limit * 1).exec();
        const count = await service.getListVoituresReparation(kw).count("count");       
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


exports.getVoitureReparation = async (req, res) => {
    try{;
        const data = await service.getVoitureReparation(req.params.imm);
        res.send(data);
        }catch(error){
        res.status(500).send({ message: error });
    }

}

exports.updateDateDebutrep = (req,res) => {
    service.updateDateDebutrep(req,res);
}

exports.updateDateFinavrep = (req,res) => {
    service.updateDateFinrep(req,res);
}


exports.getListVoituresNovalBon = async (req, res) => {
    try{

        const { page = 1, limit = 2, kw="" } = req.query;
        const docs = await service.getListVoituresNovalBon(kw).skip((page-1) * limit).limit(limit * 1).exec();
        const count = await service.getListVoituresNovalBon(kw).count("count");
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

exports.getListVoituresReparer = async (req, res) => {
    try{

        const { page = 1, limit = 2, kw="" } = req.query;
        const docs = await service.getListVoituresReparer(req,kw).skip((page-1) * limit).limit(limit * 1).exec();
        const count = await service.getListVoituresReparer(req,kw).count("count");
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

exports.getListVoituresReparerDetails = async (req, res) => {
    try{
        const data = await service.getListVoituresReparerDetails(req);
        res.send(data);
        }catch(error){
        res.status(500).send({ message: error });
    }

}

exports.validerBonvoiture = (req,res) => {
    service.validerBonvoiture(req,res);
}

