const express = require("express");
const {getOneUser,createAdmin, getadmins, updatepassword, updateAdmin, deleteadmin } = require("../controllers/adminController");
const { requireSignIn, isAuth } = require("../middleware/auth");
const { userById } = require("../middleware/admin");
const router = express.Router();

 router.get("/alladmins/:mle",requireSignIn,isAuth,getadmins);
 router.put("/updatepassword/:mle",requireSignIn,isAuth,updatepassword)
 router.post('/create/:mle',requireSignIn,isAuth,createAdmin);
 router.put('/update/:mle',requireSignIn,isAuth,updateAdmin);
router.param("mle", userById);

module.exports = router;