const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Authentification simple (examen / projet académique)
  if (email === "admin@admin.com" && password === "admin123") {
    const token = jwt.sign(
      { email, role: "ADMIN" },
      secret,
      { expiresIn }
    );

    return res.status(200).json({
      message: "Authentification réussie",
      token,
    });
  }

  res.status(401).json({ message: "Identifiants invalides" });
};
