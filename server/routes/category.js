const express = require("express");
const { saveCategory, updateCategory, deleteCategory, getAllCategories } = require("../controllers/categoryController");
const { userById } = require("../middleware/admin");

const { requireSignIn ,isAuth} = require("../middleware/auth");


const router = express.Router();
router.get("/allcategories/:mle",requireSignIn,isAuth,getAllCategories);
router.post('/create/:mle',requireSignIn,isAuth,saveCategory);
router.param("mle", userById);
router.put('/update/:mle',requireSignIn,isAuth,updateCategory);
router.delete('/deletecategory/:mle',requireSignIn,isAuth,deleteCategory);
module.exports = router;