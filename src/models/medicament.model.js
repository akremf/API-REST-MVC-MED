const db = require("../config/db");

// GET all
exports.findAll = (callback) => {
  db.query("SELECT * FROM medicaments", callback);
};

// CREATE
exports.create = (medicament, callback) => {
  const sql = `
    INSERT INTO medicaments (nom, dosage, forme, quantiteStock)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      medicament.nom,
      medicament.dosage,
      medicament.forme,
      medicament.quantiteStock,
    ],
    callback
  );
};

// UPDATE
exports.update = (id, medicament, callback) => {
  const sql = `
    UPDATE medicaments
    SET nom = ?, dosage = ?, forme = ?, quantiteStock = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [
      medicament.nom,
      medicament.dosage,
      medicament.forme,
      medicament.quantiteStock,
      id,
    ],
    callback
  );
};

// DELETE
exports.delete = (id, callback) => {
  db.query("DELETE FROM medicaments WHERE id = ?", [id], callback);
};
