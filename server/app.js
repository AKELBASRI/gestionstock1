const express = require("express");
const cors = require("cors");
 const adminRoutes = require("./routes/admin");
 const serviceRoutes=require("./routes/service")
 const agenciesRoutes=require("./routes/agencies")
 const agentRoutes=require("./routes/agents")
 const categoryRoutes=require("./routes/category")
 const fournisseurRoutes=require("./routes/fournisseur")
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
app.use("/api/service",serviceRoutes)
app.use("/api/agencies",agenciesRoutes)
app.use("/api/agents",agentRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/fournisseurs",fournisseurRoutes)
module.exports = app;