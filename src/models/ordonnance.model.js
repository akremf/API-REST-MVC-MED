const db = require("../config/db");

// GET all
exports.findAll = (callback) => {
  db.query("SELECT * FROM ordonnances", callback);
};

// CREATE
exports.create = (ordonnance, callback) => {
  const sql = `
    INSERT INTO ordonnances (date, patientId, medecinId)
    VALUES (?, ?, ?)
  `;
  db.query(
    sql,
    [ordonnance.date, ordonnance.patientId, ordonnance.medecinId],
    callback
  );
};

// GET by ID
exports.findById = (id, callback) => {
  db.query("SELECT * FROM ordonnances WHERE id = ?", [id], callback);
};

// ADD médicament prescrit
exports.addMedicament = (ordonnanceId, data, callback) => {
  const sql = `
    INSERT INTO medicament_prescrit
    (ordonnanceId, medicamentId, quantiteParJour, duree)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [ordonnanceId, data.medicamentId, data.quantiteParJour, data.duree],
    callback
  );
};

// GET médicaments prescrits
exports.getMedicaments = (ordonnanceId, callback) => {
  const sql = `
    SELECT mp.*, m.nom, m.dosage, m.forme
    FROM medicament_prescrit mp
    JOIN medicaments m ON mp.medicamentId = m.id
    WHERE mp.ordonnanceId = ?
  `;
  db.query(sql, [ordonnanceId], callback);
};

// GET ordonnances par médecin
exports.findByMedecin = (medecinId, callback) => {
  db.query(
    "SELECT * FROM ordonnances WHERE medecinId = ?",
    [medecinId],
    callback
  );
};
