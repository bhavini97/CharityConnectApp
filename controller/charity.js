const charity = require('../service/charity');

module.exports = {
    addNewOrganization : async(req,res)=>{

        const {name,password,email,location,info} = req.body;

        if(!name || !password || !email || !location || !info){
            return res.status(400).json({ message: "All fields to create new organization" });
        }
        try{
            const result = await charity.addNewOrganizetion(name,password,email,location,info);
            return res.status(200).json({message:'organization sign in successfully'})
        }catch(err){
            console.log(err);
            return res.status(401).json({message:err.message});
        }
    },

    loginCharityOrg : async(req,res)=>{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:'email and password are necessary for login'});
        }
        try{
          const token = await charity.loginCharityOrg(email,password);
          return res.status(200).json({message:'Login Successful',token})
       }
       catch(err){
        console.log(err);
        return res.status(401).json({message:err.message})
       }
    }
}