const express = require("express");

const authController = require("../controllers/authController");
const {userSigninValidator, userSignupValidator}=require('../middleware/userValidator')

const router = express.Router();
//router.get("/signin", userController.signin);
router.post("/signUp",userSignupValidator,authController.signUp);
router.post("/signin",userSigninValidator,authController.signIn);
router.get('/signout',authController.signout);
module.exports = router; 