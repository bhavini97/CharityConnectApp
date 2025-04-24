const {Charity,CharityProjects, Order} = require('../models/centralized');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    addNewOrganizetion : async(name,password,email,location,info)=>{
    try{

        const existingUser = await Charity.findOne({
            where:{
                [Op.or] :[{email},{charityname:name}]
            }
        });

        if(existingUser){
            throw new Error('User with same name or email exist');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = Charity.create({
            charityname:name,
            password:hashedPassword,
            email:email,
            location:location,
            info:info
        }) 
        return result;

    }catch(err){
        throw err;
    }
},

 loginCharityOrg : async(email,password)=>{
      
    try{
        const org = await Charity.findOne({where:{email}});
        if(!org){
            throw new Error(`Your Organisation is not registered with us`);       
        }

        if(org.status==='PENDING'){
            throw new Error(`Waiting for Admin approval`); 
        }
        else if(org.status==='DECLINE'){
            await Charity.destroy({where:{id:org.id}})
            throw new Error(`ADMIN REJECTED YOUR APPLICATION`); 
        }
        //MATCHING password with stored encrypted password
        const match = await bcrypt.compare(password,org.password);
        if(!match){
         throw new Error('Invalid Password');
        }
        
        const token = jwt.sign({orgId:org.id, role:'charity'},process.env.JWT_SECRET_KEY);
        return token;

    }catch(err){
        console.log(err);
        throw err;
    }
 }
}