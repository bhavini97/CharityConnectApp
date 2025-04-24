const jwt = require('jsonwebtoken');
const {User} = require('../models/centralized');
 const bcrypt = require('bcrypt');


module.exports ={
    addUserToTable : async(username,email,password)=>{
        try{
            // this will ensure that email and phone are unqiue for each user
      const existingUser = await User.findOne({
        where: { email : email},
    });

      if (existingUser) {
        throw new Error("User already exists with this email or phone");
      }

      const hashedPassword = await bcrypt.hash(password,10);
      const result = User.create({
        username: username,
        email:email,
        password:hashedPassword
      })

       return result;
        }catch(err){
          throw err;
        }
      
    },
    
    loginUser: async(email,password)=>{

      try{

        // finding user name in table
         const user = await User.findOne({where:{email}});

         if(!user){
          throw new Error(`User doesn't exist`)
         }
         if(user.status==='PENDING'){
          throw new Error(`Waiting for Admin approval`); 
      }
      else if(user.status==='DECLINE'){
          await User.destroy({where:{id:user.id}})
          throw new Error(`ADMIN REJECTED YOUR APPLICATION`); 
      }

     //MATCHING password with stored encrypted password
         const match = await bcrypt.compare(password,user.password);
         if(!match){
          throw new Error('Invalid Password');
         }

         // generate token for client
        const token = jwt.sign({userId:user.id, role:'user'},process.env.JWT_SECRET_KEY);
        return token;

      }catch(err){
         throw err;
      }
    }
}