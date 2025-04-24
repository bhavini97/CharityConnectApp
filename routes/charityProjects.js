const charityProjectController = require('../controller/charityProjects');
const express = require("express");
const router = express.Router();
const path = require('path')
const middleware = require('../middleware/jwt/jwt');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","charity","charityProjects.html"))
})

router.get('/addNewProject',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","charity","projectForm.html"))
})

router.post('/addNewProject',middleware,charityProjectController.addNewProject);

router.get('/display',middleware,charityProjectController.findAllProjects);

router.get('/dashboard',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"..","views","static","charity","charityProfile.html"))
});

router.get('/profile',middleware,charityProjectController.charityProfile);
router.put('/profile',middleware,charityProjectController.updateCharityDetails);

router.get('/user',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","user","searchPage.html"))
})

// routes/projectRoutes.js
router.get('/search', middleware, charityProjectController.searchProjects);

module.exports = router;