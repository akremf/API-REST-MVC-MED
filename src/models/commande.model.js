const db = require("../config/db");

// CREATE
exports.create = (commande, callback) => {
  const sql = `
    INSERT INTO commandes
    (ordonnanceId, patientId, pharmacienId, status, dateCreation)
    VALUES (?, ?, ?, ?, NOW())
  `;
  db.query(
    sql,
    [
      commande.ordonnanceId,
      commande.patientId,
      commande.pharmacienId,
      commande.status,
    ],
    callback
  );
};

// GET by ID
exports.findById = (id, callback) => {
  const sql = `
    SELECT c.*, p.name AS patient, ph.name AS pharmacien
    FROM commandes c
    JOIN patients p ON c.patientId = p.id
    JOIN pharmaciens ph ON c.pharmacienId = ph.id
    WHERE c.id = ?
  `;
  db.query(sql, [id], callback);
};

// UPDATE status
exports.updateStatus = (id, status, callback) => {
  db.query(
    "UPDATE commandes SET status = ? WHERE id = ?",
    [status, id],
    callback
  );
};

// GET par patient
exports.findByPatient = (patientId, callback) => {
  db.query(
    "SELECT * FROM commandes WHERE patientId = ?",
    [patientId],
    callback
  );
};

// GET par pharmacien
exports.findByPharmacien = (pharmacienId, callback) => {
  db.query(
    "SELECT * FROM commandes WHERE pharmacienId = ?",
    [pharmacienId],
    callback
  );
};
