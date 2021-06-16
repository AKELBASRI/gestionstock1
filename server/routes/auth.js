const express = require("express");

const authController = require("../controllers/authController");
const {userSigninValidator}=require('../middleware/userValidator')

const router = express.Router();
//router.get("/signin", userController.signin);
router.post("/signUp",userSigninValidator,authController.signUp);
router.post("/signin",authController.signIn);
router.get('/signout',authController.signout);
module.exports = router; 