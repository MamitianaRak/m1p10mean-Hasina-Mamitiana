const db = require("../models");
const service = require("../services/stat.service");
const depense = db.depense;

exports.financetest = (req, res) => {
  res.status(200).send("finance Content.");
};



exports.getStat = async (req, res) => {
  const chimois = await service.getchiAffMois();
  const depmois = await service.getdepenseMois();
  const chian = await service.getchiAffAn();
  const depan = await service.getdepenseAn();
  let statchi = await service.getStatchiffreA();
  let statdep = await service.getStatdepense();
  let avgReparation = await service.getAvgReparation();
  let benefice = null;
  if (statchi.length > 0 && statdep.length > 0) {
    delete statchi[0]._id;
    delete statdep[0]._id;
      //iterate over map2 entries with acc set to map1 at start
   benefice = Object.entries(statdep[0]).reduce((acc, [key, value]) =>
  // if key is already in map1, add the values, otherwise, create new pair
  ({ ...acc, [key]: (acc[key] || 0) - value })
  , { ...statchi[0] });
  }

  const initial = { janvier: 0, fevrier: 0, mars: 0, avril: 0, mai: 0, juin: 0, juillet: 0, aout: 0, septembre: 0, octobre: 0, novembre: 0, decembre: 0 };

  let stat = {
    chiffMois: chimois[0]?.chiffreAffairesMois ?? 0,
    chiffAn: chian[0]?.chiffreAffairesAn ?? 0,
    depenseMois: depmois[0]?.totalDepensesMois ?? 0,
    depenseAn: depan[0]?.totalDepensesAn ?? 0,
    statchi: statchi[0] ?? initial,
    statbenefice: benefice ?? initial,
    avgReparation: avgReparation[0]?.averageTime ?? 0

  };
  res.send(stat);
};