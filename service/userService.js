const {User,Order, UserFileDownload} = require('../models/centralized');

module.exports={
    getUserDetails: async(id)=>{
       try{
        const result = await User.findByPk(id);
        return result;

       }catch(err){
         throw err;
       }
    },

    updateUserDetails : async (userId, username, email) => {
        return await User.update({ username, email }, { where: { id: userId } });
      },

      getAllUserCharity:async(userId)=>{
        return await Order.findAll({where:{user_id:userId}});
      },

      getPrevDownloadFiles: async(userId) =>{
        return await UserFileDownload.findAll({
          where: { userId },
          order: [["downloadedAt", "DESC"]],
        });
      }
}
