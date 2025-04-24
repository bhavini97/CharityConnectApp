const authController = require('../controller/auth');
const express = require("express");
const router = express.Router();
const path = require('path')
const middleware = require('../middleware/jwt/jwt');


router.get('/signUp',(req,res)=>{
   
res.sendFile(path.join(__dirname,"..","views","static","user","signUp.html"))
   
})

router.post('/signUp',authController.addUserToTable);
router.get('/login',(req,res)=>{
        res.sendFile(path.join(__dirname,"..","views","static","user","login.html"))
    })
router.post('/login',authController.loginUser);



module.exports = router;
