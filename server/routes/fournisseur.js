const express = require("express");

const { saveFournisseur, getAllFournisseurs, updateFournisseur, deleteFournisseur } = require("../controllers/fournisseurController");
const { userById } = require("../middleware/admin");

const { requireSignIn ,isAuth} = require("../middleware/auth");


const router = express.Router();
router.get("/all/:mle",requireSignIn,isAuth,getAllFournisseurs);
router.post('/create/:mle',requireSignIn,isAuth,saveFournisseur);
router.param("mle", userById);
router.put('/update/:mle',requireSignIn,isAuth,updateFournisseur);
router.delete('/delete/:mle',requireSignIn,isAuth,deleteFournisseur);
module.exports = router;