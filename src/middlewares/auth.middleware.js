const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
    req.user = decoded;
    next();
  });
};
