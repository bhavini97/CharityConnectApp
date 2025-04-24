const userController = require('../controller/user');
const express = require("express");
const router = express.Router();
const path = require('path')
const middleware = require('../middleware/jwt/jwt');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","static","user","userProfile.html"))
})

router.get('/profile',middleware,userController.getUserDetails);
router.put('/profile',middleware,userController.updateUserDetails);
router.get('/download',middleware,userController.downloadFiles);
router.get('/prevDownloads',middleware,userController.prevDownloadFiles);
module.exports = router;