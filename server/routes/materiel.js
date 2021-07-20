const express = require("express");
const { saveMateriel, getallmateriels } = require("../controllers/MaterielController");

const { userById } = require("../middleware/admin");
const { requireSignIn, isAuth } = require("../middleware/auth");

const router = express.Router();
router.get("/all/:mle",requireSignIn,isAuth,getallmateriels);
router.post('/create/:mle',requireSignIn,isAuth,saveMateriel);
router.param("mle", userById);

module.exports = router;