const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv/config");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "Pas de Token fourni!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Accès non autorisé!" });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;