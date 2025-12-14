const express = require("express");
const cors = require("cors");
require("dotenv").config();

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
      message: "API REST MVC Pharmacie - OK 🚀",
      status: "running"
    });
  });

// Routes
app.use("/patients", require("./routes/patient.routes"));
app.use("/medicaments", require("./routes/medicament.routes"));
app.use("/ordonnances", require("./routes/ordonnance.routes"));
app.use("/commandes", require("./routes/commande.routes"));


app.use("/auth", require("./routes/auth.routes"));


  

// Middleware erreurs (toujours à la fin)
app.use(errorMiddleware);

module.exports = app;
