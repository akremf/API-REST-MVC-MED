const express = require("express");
const router = express.Router();
const ordonnanceController = require("../controllers/ordonnance.controller");

// Ordonnances
router.get("/", ordonnanceController.getAllOrdonnances);
router.post("/", ordonnanceController.createOrdonnance);
router.get("/:id", ordonnanceController.getOrdonnanceById);

// Médicaments prescrits
router.post("/:id/medicaments", ordonnanceController.addMedicamentToOrdonnance);
router.get("/:id/medicaments", ordonnanceController.getMedicamentsByOrdonnance);

// Relation médecin → ordonnances
router.get("/medecin/:id/ordonnances", ordonnanceController.getOrdonnancesByMedecin);

module.exports = router;
