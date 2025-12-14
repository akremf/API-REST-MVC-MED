const Commande = require("../models/commande.model");

// POST /commandes
exports.createCommande = (req, res, next) => {
  const { ordonnanceId, patientId, pharmacienId, status } = req.body;

  if (!ordonnanceId || !patientId || !pharmacienId) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  Commande.create(
    {
      ordonnanceId,
      patientId,
      pharmacienId,
      status: status || "EN_COURS",
    },
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({
        message: "Commande créée",
        id: result.insertId,
      });
    }
  );
};

// GET /commandes/:id
exports.getCommandeById = (req, res, next) => {
  Commande.findById(req.params.id, (err, data) => {
    if (err) return next(err);
    if (!data.length) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(data[0]);
  });
};

// PATCH /commandes/:id/status
exports.updateCommandeStatus = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Statut requis" });
  }

  Commande.updateStatus(req.params.id, status, (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json({ message: "Statut mis à jour" });
  });
};

// GET commandes par patient
exports.getCommandesByPatient = (req, res, next) => {
  Commande.findByPatient(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// GET commandes par pharmacien
exports.getCommandesByPharmacien = (req, res, next) => {
  Commande.findByPharmacien(req.params.id, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};
