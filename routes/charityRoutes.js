const charityController = require('../controller/charity');
const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer');
const middleware = require('../middleware/jwt/jwt')
const upload = multer({ storage: multer.memoryStorage() });

router.get('/signUp',(req,res)=>{  
res.sendFile(path.join(__dirname,"..","views","static","charity","signUp.html"));
})

router.post('/signUp',charityController.addNewOrganization);
router.get('/login',(req,res)=>{
        res.sendFile(path.join(__dirname,"..","views","static","charity","login.html"))
    })
router.post('/login',charityController.loginCharityOrg);

/// this route is to send the report send by charity to s3
router.post('/send-report',middleware,upload.single("report"),charityController.sendReportoEmail)

module.exports = router;

