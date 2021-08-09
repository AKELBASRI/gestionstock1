const express = require("express");
const { deleteCategory } = require("../controllers/CategoryController");
const { getAllDesignation, saveDesignation, updateDesignation, deleteDesignation, showDesignation, DesignationById } = require("../controllers/designationController");
const { GetCountbyType } = require("../controllers/materielController");

const { userById } = require("../middleware/admin");

const { requireSignIn ,isAuth} = require("../middleware/auth");


const router = express.Router();
router.get("/all/:mle",requireSignIn,isAuth,getAllDesignation);
router.get("/countMaterielbyType/:mle",requireSignIn,isAuth,GetCountbyType);
router.get("/getdesignationbytype/:mle/:idtype",requireSignIn,isAuth,showDesignation);
router.post('/create/:mle',requireSignIn,isAuth,saveDesignation);
router.put('/update/:mle',requireSignIn,isAuth,updateDesignation);
router.param("mle", userById);
router.param("idtype", DesignationById);
router.delete('/delete/:mle',requireSignIn,isAuth,deleteDesignation);
module.exports = router;