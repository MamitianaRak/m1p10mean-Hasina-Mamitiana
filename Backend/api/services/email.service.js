const nodemailer = require('nodemailer');
const path = require("path");
require("dotenv/config");


const frontURL = process.env.FRONT_URL;


// Create and initialize the email transport object
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_SECRET
  }
});


exports.sendEmailReparation = async (req, res) => {
  try {
    const emailData = {
      to: req.body.user.email,
      from: process.env.GMAIL_USER,
      subject: "Réparation de la voiture " + req.body.marque + ", imm: " + req.params.imm,
      html: `
      <div>
        <h3>Cher <span>${req.body.user.nom} ${req.body.user.prenom}</span>,</h3>
        <p>Nous vous informons que la voiture ${req.body.marque} avec l' immatriculation ${req.params.imm} a été reparée</p>
        <p>
            Veillez consulter les historiques de réparation pour voir la facture de celle-ci .
        </p>
        <p>
            Veillez vous présentez dans les plus bref délais afin de procéder au payement et de récupérer la voiture. 
        </p>
      </div>
      `
    };

    //Send the email
    await transporter.sendMail(emailData);
    res.status(200).send({ message: "Composant mis à jour et Email envoyer" });

  } catch (e) {
    console.error(e);
    res.status(500).send(error);
  }
}

exports.sendConfirmationEmail = async (name, email, confirmationCode) => {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Merci de vous être abonné. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=${frontURL}/confirm/${confirmationCode}> Cliquez ici</a>
          </div>`,
  });
};

exports.sendEmailDiagnostique = async (req, res) => {
  try {
    const emailData = {
      to: req.body.email,
      from: process.env.GMAIL_USER,
      subject: "Diagnostique de votre voiture " + req.body.immatriculation + " marque " + req.body.marque,
      html: `
      <div>
        <h3>Cher <span>${req.body.nom} ${req.body.prenom}</span>,</h3>
        <p>Nous vous informons que la dignostique de votre voiture est terminée.</p>
        <p>
            Veillez consulter votre compte pour valider les réparation à faire.
        </p>
        <p>
           Merci de votre confiance.
        </p>
      </div>
      `
    };

    //Send the email
    await transporter.sendMail(emailData);
    next();

  } catch (e) {
    console.error(e);
  }
}