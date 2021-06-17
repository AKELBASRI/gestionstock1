const express = require("express");
const cors = require("cors");
 const adminRoutes = require("./routes/admin");
// const serviceRoutes=require("./routes/service")
// const dossierRoute=require("./routes/dossier");
 const authRoutes=require("./routes/auth");
const expressValidator = require('express-validator');
// Import Routes

// config App

require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(expressValidator());
app.use("/api", authRoutes);
 app.use("/api/admin", adminRoutes);
// app.use("/api/service",serviceRoutes)

module.exports = app;