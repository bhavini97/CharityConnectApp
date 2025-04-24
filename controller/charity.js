const charity = require('../service/charity');
const uploadToS3 = require('../service/S3Service');
const emailService = require('../service/emailService');
module.exports = {

    /// this add new charity organjisation in charity table
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

    // this login the charity and send token. 
    // if the status of application is pending it will not login
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
    },

    // this is to send to send reports and updates to users
    // this takes file from frontend and uploads it in s3
    // filename creates a unique filename that charity sends
    sendReportoEmail: async (req, res) => {
        try{
        const file = req.file;  
        const fileName = `impact_report_${Date.now()}.pdf`;  
    
        // Upload the file to S3
        const fileUrl = await uploadToS3(file.buffer, fileName);
    
        // Send email with the file URL
        await emailService.sendReportEmail(fileUrl);  // This will send the file URL in an email
    
        res.status(200).json({ message: 'Report uploaded and email sent successfully' });
      } catch (err) {
        console.error('Error uploading report:', err);
        res.status(500).json({ message: 'Error uploading report' });
      }
    }
}