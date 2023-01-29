const db = require("../models");
const User = db.user;
const roles = db.ROLES;
require("dotenv/config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var CryptoJS = require("crypto-js");

const serviceMail = require("../services/email.service");

exports.signup = (req, res) => {

  const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET);
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:req.body.role,
    confirmationCode: token
  });

    user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "l\'utilisateur a été enregistré!" });
    await serviceMail.sendConfirmationEmail(
      req.body.prenom,
      req.body.email,
      token
    );
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user.status != "Active") {
        return res.status(401).send({
          message: "Compte en attente vérifier votre email!",
        });
      }

      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Mot de passe incorrect!" });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      if(req.body.role !== user.role){
        return res.status(401).send({ message: "Rôle incorrect!" });
      }
     
      var authoritie =  user.role;

      req.session.token = token;

      res.status(200).send({
        nom: user.nom,
        prenom:user.prenom,
        email: user.email,
        role: CryptoJS.AES.encrypt(authoritie,process.env.ROLE_SECRET).toString()
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Vous êtes déconnectés!" });
  } catch (err) {
    this.next(err);
  }
};

exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};