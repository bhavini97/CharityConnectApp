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

/// this will add new project for charity organisation
router.post('/addNewProject',middleware,charityProjectController.addNewProject);

// this will display all the projects that an organization has launched
router.get('/display',middleware,charityProjectController.findAllProjects);

router.get('/dashboard',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"..","views","static","charity","charityProfile.html"))
});

//// this will get charity infomation
router.get('/profile',middleware,charityProjectController.charityProfile);
router.put('/profile',middleware,charityProjectController.updateCharityDetails);

router.get('/user',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","user","searchPage.html"))
})

// routes/projectRoutes.js // this is for user. // when the user is in its dashboard it can use this to search charity projects using search features
router.get('/search', middleware, charityProjectController.searchProjects);

module.exports = router;