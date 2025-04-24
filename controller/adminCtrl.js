const adminService = require('../service/adminService');


module.exports = {

    loginAdmin: async(req,res)=>{
        const password = req.body.password;
        try{
            const token  = await adminService.loginAdmin(password);
            return res.status(200).json({message:'Login Successful',token})
       }
       catch(err){
        console.log(err);
        return res.status(401).json({message:'something went wrong while loggin'})
       }
  },

    getAllOrganisations: async (req, res) => {
        if(req.user.role !== 'admin'){
            return res.status(500).json({ message: "You are not admin" });
        }
      try {
        const organisations = await adminService.getAllOrganisations();
        return res.status(200).json({ organisations });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching organisations" });
      }
    },
  
    deleteOrganisation: async (req, res) => {
        if(req.user.role !== 'admin'){
            return res.status(500).json({ message: "You are not admin" });
        }
      const { id } = req.params;
      try {
        const result = await adminService.deleteOrganisation(id);
        return res.status(200).json({ message: "Organisation deleted successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting organisation" });
      }
    },
  
    updateOrganisationStatus: async (req, res) => {
        if(req.user.role !== 'admin'){
            return res.status(500).json({ message: "You are not admin" });
        }
      const { id } = req.params;
      const { status } = req.body;
      try {
        const result = await adminService.updateOrganisationStatus(status,id)
        return res.status(200).json({ message: "Status updated successfully" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating status" });
      }
    }
  } 
