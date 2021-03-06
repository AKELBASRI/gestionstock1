const express = require('express');
const {
  getAllServices, saveService, updateService,
  deleteservice, getAllParentsOfService, getAllServiceswithhiearchy, getOneServiceHiearchy,
} = require('../controllers/serviceController');

const { userById } = require('../middleware/admin');
const { requireSignIn, isAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/allserviceswithhiearchy/:mle', requireSignIn, isAuth, getAllServiceswithhiearchy);
router.get('/allservices/:mle', requireSignIn, isAuth, getAllServices);
router.get('/getOneServiceHiearchy/:mle', requireSignIn, isAuth, getOneServiceHiearchy);
router.get('/allParentsOfService/:mle', requireSignIn, isAuth, getAllParentsOfService);
router.post('/create/:mle', requireSignIn, isAuth, saveService);
router.param('mle', userById);
router.put('/update/:mle', requireSignIn, isAuth, updateService);
router.delete('/deleteservice/:mle', requireSignIn, isAuth, deleteservice);
module.exports = router;
