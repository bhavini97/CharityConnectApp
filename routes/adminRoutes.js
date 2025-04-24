const adminController = require('../controller/adminCtrl');
const middleware = require('../middleware/jwt/jwt');
const express = require('express');
const router = express.Router();
const path = require('path')


router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","admin","adminLogin.html"));
})

router.post('/login',adminController.loginAdmin);

router.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","admin","landingPage.html"));
})

router.get('/org',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","admin","orgChange.html"));
})

// Route to get all charities
router.get('/organisations', middleware, adminController.getAllOrganisations);

// Route to delete a charity by ID
router.delete('/organisations/:id', middleware,adminController.deleteOrganisation);

// Route to update a charity's status
router.put('/organisations/:id/status', middleware, adminController.updateOrganisationStatus);
module.exports = router;