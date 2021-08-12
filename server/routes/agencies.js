const express = require('express');
const { getagencies } = require('../controllers/agenciesController');
const { userById } = require('../middleware/admin');

const router = express.Router();

const { requireSignIn, isAuth } = require('../middleware/auth');

router.get('/all/:mle', requireSignIn, isAuth, getagencies);
router.param('mle', userById);
module.exports = router;
