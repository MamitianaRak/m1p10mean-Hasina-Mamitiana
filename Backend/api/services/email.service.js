const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const path = require("path");
require("dotenv/config");

const fs = require('fs');
inlineCss = require('inline-css');

const emailValidator = require('deep-email-validator');

const frontURL = process.env.FRONT_URL;


// Create and initialize the email transport object
const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_SECRET
  }
});

exports.isEmailValid = async (email) => {
  return emailValidator.validate(email)
}

exports.sendEmailReparation = async (req, res) => {
  try {
    //Load the template file
    const templateFile = fs.readFileSync((path.join(__dirname, '..') + "\\templates\\reparationMail\\reparationMail.html"));
    //Load and inline the style
    const templateStyled = await inlineCss(templateFile.toString(), { url: "file://" + (path.join(__dirname, '..') + "\\templates\\reparationMail\\") });
    //Inject the data in the template and compile the html
    const templateCompiled = handlebars.compile(templateStyled);
    const templateRendered = templateCompiled({ user: req.body.user, marque: req.body.marque, imm: req.params.imm });

    const emailData = {
      to: req.body.user.email,
      from: process.env.GMAIL_USER,
      subject: "Réparation de la voiture " + req.body.marque + ", imm: " + req.params.imm,
      html: templateRendered
    };

    //Send the email
    transporter.sendMail(emailData, function (error, info) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send({ message: "Composant mis à jour et Email envoyer" });
      }
    });

  } catch (e) {
    console.error(e);
  }
}

exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Merci de vous être abonné. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=${frontURL}/confirm/${confirmationCode}> Cliquez ici</a>
          </div>`,
  }).catch(err => console.log(err));
};