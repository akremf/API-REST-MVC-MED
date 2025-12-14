const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, patientController.getAllPatients);
router.post("/", auth, patientController.createPatient);

// Routes spécifiques avant les routes génériques
router.get("/:id/ordonnances", auth, patientController.getPatientOrdonnances);
router.get("/:id/commandes", auth, patientController.getPatientCommandes);

// Routes génériques
router.get("/:id", auth, patientController.getPatientById);
router.put("/:id", auth, patientController.updatePatient);
router.delete("/:id", auth, patientController.deletePatient);

module.exports = router;
