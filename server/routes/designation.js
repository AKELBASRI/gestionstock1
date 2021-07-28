const express = require("express");
const { deleteCategory } = require("../controllers/CategoryController");
const { getAllDesignation, saveDesignation, updateDesignation, deleteDesignation } = require("../controllers/designationController");

const { userById } = require("../middleware/admin");

const { requireSignIn ,isAuth} = require("../middleware/auth");


const router = express.Router();
router.get("/all/:mle",requireSignIn,isAuth,getAllDesignation);
router.post('/create/:mle',requireSignIn,isAuth,saveDesignation);
router.put('/update/:mle',requireSignIn,isAuth,updateDesignation);
router.param("mle", userById);
router.delete('/delete/:mle',requireSignIn,isAuth,deleteDesignation);
module.exports = router;