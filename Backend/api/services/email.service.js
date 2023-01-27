const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const path = require("path");

const fs = require('fs');
inlineCss = require('inline-css');

const emailValidator = require('deep-email-validator');

const frontURL = "https://garage-eight.vercel.app";


// Create and initialize the email transport object
const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth: {
    user: "etechorion@gmail.com",
    pass: "fmloznfqzwjbqtqf"
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
      to: "receiver@example.com",
      from: '"Example" sender@example.com',
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
    from: 'c363cd7b0f371c',
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Merci de vous être abonné. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=${frontURL}/confirm/${confirmationCode}> Cliquez ici</a>
          </div>`,
  }).catch(err => console.log(err));
};