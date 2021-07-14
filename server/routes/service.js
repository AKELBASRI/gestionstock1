const express = require("express");
const { getAllServices, saveService, updateService } = require("../controllers/serviceController");

const { userById } = require("../middleware/admin");
const { requireSignIn, isAuth } = require("../middleware/auth");

const router = express.Router();
router.get("/allservices/:mle",requireSignIn,isAuth,getAllServices);
router.post('/create/:mle',requireSignIn,isAuth,saveService);
router.param("mle", userById);
router.put('/update/:mle',requireSignIn,isAuth,updateService);
module.exports = router;