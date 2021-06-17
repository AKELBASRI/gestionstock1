const express = require("express");
const {getOneUser,createUser, getusers, updatepassword, updateUser, deleteUser } = require("../controllers/adminController");
const { requireSignIn, isAuth, isAdmin } = require("../middleware/auth");
const { userById } = require("../middleware/admin");
const router = express.Router();

 router.get("/alladmins/:mle",requireSignIn,isAuth,getusers);
router.param("mle", userById);

module.exports = router;