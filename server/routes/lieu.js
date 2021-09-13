const express = require('express');
const { getalllieux, importlieu, savelieu } = require('../controllers/lieuController');

const { userById } = require('../middleware/admin');

const { requireSignIn, isAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/alllieux/:mle', requireSignIn, isAuth, getalllieux);
router.post('/importlieu', importlieu);
router.post('/create/:mle', requireSignIn, isAuth, savelieu);
router.param('mle', userById);

module.exports = router;
