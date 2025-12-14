const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commande.controller");

// Commandes
router.post("/", commandeController.createCommande);
router.get("/:id", commandeController.getCommandeById);
router.patch("/:id/status", commandeController.updateCommandeStatus);

// Relations
router.get("/patient/:id", commandeController.getCommandesByPatient);
router.get("/pharmacien/:id", commandeController.getCommandesByPharmacien);

module.exports = router;
