const express = require('express');
const { createbackupMateriel } = require('../controllers/materielController');

const {
  saveMateriel, getallmateriels, updateMateriel,
  deletemateriel, AffecterMaterielle, GetTotalbyType, GetAvailableMaterielTotal,
} = require(['../controllers/MaterielController'][0]);

const { userById } = require('../middleware/admin');
const { requireSignIn, isAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/all/:mle', requireSignIn, isAuth, getallmateriels);
router.post('/create/:mle', requireSignIn, isAuth, saveMateriel);
router.post('/createbackupMateriel/:mle', requireSignIn, isAuth, createbackupMateriel);
router.put('/update/:mle', requireSignIn, isAuth, updateMateriel);
router.put('/affecter/:mle', requireSignIn, isAuth, AffecterMaterielle);
router.delete('/delete/:mle', requireSignIn, isAuth, deletemateriel);
router.param('mle', userById);
router.get('/countMaterielbyType/:mle', requireSignIn, isAuth, GetTotalbyType);
router.get('/countMaterielavailablebyType/:mle', requireSignIn, isAuth, GetAvailableMaterielTotal);
module.exports = router;
