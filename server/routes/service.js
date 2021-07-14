const express = require("express");
const { getAllServices } = require("../controllers/serviceController");

const { userById } = require("../middleware/admin");
const { requireSignIn, isAuth } = require("../middleware/auth");

const router = express.Router();
router.get("/allservices/:mle",requireSignIn,isAuth,getAllServices);
router.param("mle", userById);
module.exports = router;