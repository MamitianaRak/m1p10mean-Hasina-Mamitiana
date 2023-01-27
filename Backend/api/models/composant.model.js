const mongoose = require("mongoose");

const Composant = mongoose.model(
  "Composant",
  new mongoose.Schema({
    nom: String,
    pieces: [] // Noms des pieces
  }
));

module.exports = Composant;