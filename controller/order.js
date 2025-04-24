const orderService = require('../service/order');

module.exports={
    postPaymentOrder : async(req,res)=>{
        if(req.user.role!=='user'){
            res.status(500).json({ message: 'You are not authorized.SignUp to make payment' });
        }
        const {charity_project_name,charity_id} = req.body;
        console.log(charity_project_name);
        try {
        const { paymentSessionId, orderId } = await orderService.createPaymentOrder(req.user.userId,charity_project_name,charity_id);
        res.status(200).json({ paymentSessionId, orderId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    },

    getPaymentStatus : async(req,res)=>{
        try {
          const userId = req.user.userId;
            const {orderId , charity_project_name,charity_id} = req.query;
            const response = await orderService.getPaymentStatus(orderId,charity_project_name,charity_id,userId);
            res.status(200).json(response);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
    }
}