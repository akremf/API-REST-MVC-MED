const Patient = require("../models/patient.model");

// GET /patients
exports.getAllPatients = (req, res, next) => {
  Patient.findAll((err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// POST /patients
exports.createPatient = (req, res, next) => {
  const { name, age, adresse, telephone } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  Patient.create({ name, age, adresse, telephone }, (err, result) => {
    if (err) return next(err);
    res.status(201).json({ message: "Patient créé", id: result.insertId });
  });
};

// GET /patients/:id
exports.getPatientById = (req, res, next) => {
  Patient.findById(req.params.id, (err, data) => {
    if (err) return next(err);
    if (!data.length) {
      return res.status(404).json({ message: "Patient non trouvé" });
    }
    res.status(200).json(data[0]);
  });
};

// PUT /patients/:id
exports.updatePatient = (req, res, next) => {
  Patient.update(req.params.id, req.body, (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Patient non trouvé" });
    }
    res.status(200).json({ message: "Patient mis à jour" });
  });
};

// DELETE /patients/:id
exports.deletePatient = (req, res, next) => {
  Patient.delete(req.params.id, (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Patient non trouvé" });
    }
    res.status(200).json({ message: "Patient supprimé" });
  });
};

// GET /patients/:id/ordonnances
exports.getPatientOrdonnances = (req, res, next) => {
  Patient.getOrdonnances(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// GET /patients/:id/commandes
exports.getPatientCommandes = (req, res, next) => {
  Patient.getCommandes(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};
