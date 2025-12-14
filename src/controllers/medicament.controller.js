const Medicament = require("../models/medicament.model");

// GET /medicaments
exports.getAllMedicaments = (req, res, next) => {
  Medicament.findAll((err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// POST /medicaments
exports.createMedicament = (req, res, next) => {
  const { nom, dosage, forme, quantiteStock } = req.body;

  if (!nom || !quantiteStock) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  Medicament.create({ nom, dosage, forme, quantiteStock }, (err, result) => {
    if (err) return next(err);
    res.status(201).json({
      message: "Médicament créé",
      id: result.insertId,
    });
  });
};

// PUT /medicaments/:id
exports.updateMedicament = (req, res, next) => {
  Medicament.update(req.params.id, req.body, (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Médicament non trouvé" });
    }
    res.status(200).json({ message: "Médicament mis à jour" });
  });
};

// DELETE /medicaments/:id
exports.deleteMedicament = (req, res, next) => {
  Medicament.delete(req.params.id, (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Médicament non trouvé" });
    }
    res.status(200).json({ message: "Médicament supprimé" });
  });
};
