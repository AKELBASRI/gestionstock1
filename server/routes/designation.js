const express = require("express");
const { getAllDesignation } = require("../controllers/designationController");

const { userById } = require("../middleware/admin");

const { requireSignIn ,isAuth} = require("../middleware/auth");


const router = express.Router();
router.get("/all/:mle",requireSignIn,isAuth,getAllDesignation);

router.param("mle", userById);

module.exports = router;