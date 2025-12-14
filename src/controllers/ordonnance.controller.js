const Ordonnance = require("../models/ordonnance.model");

// GET /ordonnances
exports.getAllOrdonnances = (req, res, next) => {
  Ordonnance.findAll((err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// POST /ordonnances
exports.createOrdonnance = (req, res, next) => {
  const { date, patientId, medecinId } = req.body;

  if (!date || !patientId || !medecinId) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  Ordonnance.create({ date, patientId, medecinId }, (err, result) => {
    if (err) return next(err);
    res.status(201).json({
      message: "Ordonnance créée",
      id: result.insertId,
    });
  });
};

// GET /ordonnances/:id
exports.getOrdonnanceById = (req, res, next) => {
  Ordonnance.findById(req.params.id, (err, data) => {
    if (err) return next(err);
    if (!data.length) {
      return res.status(404).json({ message: "Ordonnance non trouvée" });
    }
    res.status(200).json(data[0]);
  });
};

// POST /ordonnances/:id/medicaments
exports.addMedicamentToOrdonnance = (req, res, next) => {
  const { medicamentId, quantiteParJour, duree } = req.body;

  if (!medicamentId || !quantiteParJour || !duree) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  Ordonnance.addMedicament(
    req.params.id,
    { medicamentId, quantiteParJour, duree },
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({ message: "Médicament ajouté à l’ordonnance" });
    }
  );
};

// GET /ordonnances/:id/medicaments
exports.getMedicamentsByOrdonnance = (req, res, next) => {
  Ordonnance.getMedicaments(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// GET /medecins/:id/ordonnances
exports.getOrdonnancesByMedecin = (req, res, next) => {
  Ordonnance.findByMedecin(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};
