const authService = require("../service/auth");

module.exports = {

  /// when users sign in, this function register it in db table
  addUserToTable: async (req, res) => {
    const { username, password, email } = req.body;

    try {
      if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required to add User To table" });
      }

      const result = await authService.addUserToTable( username, email, password);

      return res.status(200).json({ message: "User added to db" });
    } catch (err) {
      console.log("addUserToTable in auth Ctrl", err);
      return res.status(401).json({ message: err.message });
    }
  },

  // this login the user and give jwt token in return 
  loginUser : async(req,res)=>{
      const {email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
      }
       try{
      const token = await authService.loginUser(email,password);
      return res.status(200).json({message:'Login Successful',token})
       }
       catch(err){
        
        return res.status(401).json({message:err.message})
       }
  },

};
