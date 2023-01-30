const service = require("../services/composant.service");

exports.getlistpieces = async (req, res) => {
    const lista = await service.getlistpieces();
    res.send(lista.filter(e => e !== 'Entretien'));
      };

