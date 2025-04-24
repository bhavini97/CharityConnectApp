const charityController = require('../controller/charity');
const express = require("express");
const router = express.Router();
const path = require('path')


router.get('/signUp',(req,res)=>{  
res.sendFile(path.join(__dirname,"..","views","static","charity","signUp.html"));
})

router.post('/signUp',charityController.addNewOrganization);
router.get('/login',(req,res)=>{
        res.sendFile(path.join(__dirname,"..","views","static","charity","login.html"))
    })
router.post('/login',charityController.loginCharityOrg);

module.exports = router;

