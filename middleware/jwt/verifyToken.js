require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports ={

    verifyToken : (token)=>{

        try{
        const decoded = jwt.verify(token,SECRET_KEY);
          return decoded;
        }catch(err){
            throw new Error('could not verify token with secret key')
        }
    }
}