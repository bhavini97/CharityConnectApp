const userService = require('../service/userService');
const uploadToS3 = require('../service/S3Service');
const UserFileDownload = require('../models/userfileDownload');
;
module.exports = {

  // this will get user details for user profile.
    getUserDetails: async(req,res)=>{
        const userId = req.user.userId;

        try{
            const result = await userService.getUserDetails(userId);
            return res.status(200).json({result})
        }catch(err){
            console.log(err);
            return res.status(500).json({message:'User not fetched'});
        }
    },

    /// this will send data to service to update user data
    updateUserDetails: async (req, res) => {
        const userId = req.user.userId;
        const { name, email } = req.body;
    
        try {
          await userService.updateUserDetails(userId, name, email);
          return res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Failed to update user' });
        }
      },

      /// this will upload the file to s3;
      // user first call service to fetch all the order records present in order table
      // then create  a uniue filename and send the result in params of s3 function
      downloadFiles: async(req,res)=>{
        const userId = req.user.userId;
        try{
           const result = await userService.getAllUserCharity(userId);
           const fileName = `YourDetails${new Date().toISOString()}.txt`;
           const fileUrl = await uploadToS3(JSON.stringify(result), fileName);
           try{
           await UserFileDownload.create({
            userId: req.user.userId,
            fileUrl: fileUrl,
            downloadedAt: new Date(),
          });
        }catch(err){
            throw new Error('file url cannot inserted')
        }
        return res.status(200).json({ fileUrl, SUCCESS: true });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    },

    /// this will get all the previously download s3 files from userfiledownload table

    prevDownloadFiles : async(req,res)=>{
      const userId = req.user.userId;
      try{
        const downloadedFiles = await userService.getPrevDownloadFiles(userId);
      res.status(200).json({downloads: downloadedFiles });
    }catch (err) {
      res.status(400).json({ message: err.message });

      }
    }
 };

