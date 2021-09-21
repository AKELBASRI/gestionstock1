const express = require('express');
const {
  createbackupMateriel, AffecterMaterielbynumberofinventory,
  checkiftableexist, getcomparaison, getyears,
} = require('../controllers/materielController');

const {
  saveMateriel, getallmateriels, updateMateriel,
  deletemateriel, AffecterMaterielle, GetTotalbyType, GetAvailableMaterielTotal,
} = require(['../controllers/MaterielController'][0]);

const { userById } = require('../middleware/admin');
const { requireSignIn, isAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/all/:mle', requireSignIn, isAuth, getallmateriels);
// router.get('/importMateriel', importmateriel);
router.post('/create/:mle', requireSignIn, isAuth, saveMateriel);
router.post('/createbackupMateriel/:mle', requireSignIn, isAuth, createbackupMateriel);
router.put('/update/:mle', requireSignIn, isAuth, updateMateriel);
router.put('/affecter/:mle', requireSignIn, isAuth, AffecterMaterielle);
router.delete('/delete/:mle', requireSignIn, isAuth, deletemateriel);
router.param('mle', userById);
router.get('/countMaterielbyType/:mle', requireSignIn, isAuth, GetTotalbyType);
router.get('/checkiftableexist/:mle', requireSignIn, isAuth, checkiftableexist);
router.get('/countMaterielavailablebyType/:mle', requireSignIn, isAuth, GetAvailableMaterielTotal);
router.put('/AffecterMaterielbynumberofinventory/:mle', requireSignIn, isAuth, AffecterMaterielbynumberofinventory);
router.get('/comparaison/:mle', requireSignIn, isAuth, getcomparaison);
router.get('/getyears/:mle', requireSignIn, isAuth, getyears);
module.exports = router;
