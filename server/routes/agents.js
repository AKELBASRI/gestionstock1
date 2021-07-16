const express = require("express");
const { getagents, createAgent, deleteagent, updateAgent } = require("../controllers/agentController");

const { userById } = require("../middleware/admin");
const router = express.Router();

const { requireSignIn, isAuth } = require("../middleware/auth");
router.get('/all/:mle',requireSignIn,isAuth,getagents);
router.post('/create/:mle',requireSignIn,isAuth,createAgent)
router.delete('/delete/:mle',requireSignIn,isAuth,deleteagent)
router.put('/update/:mle',requireSignIn,isAuth,updateAgent)
router.param("mle", userById);
module.exports = router; 