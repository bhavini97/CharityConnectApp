const userService = require('../service/userService');
const uploadToS3 = require('../service/S3Service');
const UserFileDownload = require('../models/userfileDownload');
;
module.exports = {
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
      downloadFiles: async(req,res)=>{
        const userId = req.user.userId;
        try{
           const result = await userService.getAllUserCharity(userId);
           console.log(result);
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

