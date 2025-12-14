const db = require("../config/db");

// GET all
exports.findAll = (callback) => {
  db.query("SELECT * FROM patients", callback);
};

// CREATE
exports.create = (patient, callback) => {
  const sql = "INSERT INTO patients (name, age, adresse, telephone) VALUES (?, ?, ?, ?)";
  db.query(sql, [patient.name, patient.age, patient.adresse, patient.telephone], callback);
};

// GET by ID
exports.findById = (id, callback) => {
  db.query("SELECT * FROM patients WHERE id = ?", [id], callback);
};

// UPDATE
exports.update = (id, patient, callback) => {
  const sql = `
    UPDATE patients 
    SET name = ?, age = ?, adresse = ?, telephone = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [patient.name, patient.age, patient.adresse, patient.telephone, id],
    callback
  );
};

// DELETE
exports.delete = (id, callback) => {
  db.query("DELETE FROM patients WHERE id = ?", [id], callback);
};

// RELATION : Patient → Ordonnances
exports.getOrdonnances = (patientId, callback) => {
  db.query(
    "SELECT * FROM ordonnances WHERE patientId = ?",
    [patientId],
    callback
  );
};

// RELATION : Patient → Commandes
exports.getCommandes = (patientId, callback) => {
  db.query(
    "SELECT * FROM commandes WHERE patientId = ?",
    [patientId],
    callback
  );
};
