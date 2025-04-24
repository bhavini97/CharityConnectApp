const { Order, CharityProjects,User } = require("../models/centralized");
const {sequelize} = require('../config/db');
const cashfreeService = require("../service/cashfree");
const emailService = require('./emailService');
/**
 * Create a payment order and return session ID.
 */
async function createPaymentOrder(userId,charity_project_name,charity_id) {
  if (!userId) {
    throw new Error("User ID is required");
  }
   console.log(charity_id,charity_project_name)
  const orderId = `ORDER_${Date.now()}`; // Generate unique order ID

  // Getting service id from cashfree services file
  const paymentSessionId = await cashfreeService.createOrder(orderId, userId);
  console.log(paymentSessionId);

  await Order.create({
    order_id: orderId,
    user_id: userId,
    charity_project_name:charity_project_name,
    charity_id:charity_id,
    status: "pending",
  });

  return { paymentSessionId, orderId };
}

/**
 * Get payment status and update order/user status accordingly.
 */
async function getPaymentStatus(orderId,charity_project_name,charity_id,userId) {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  const t = await sequelize.transaction(); // Start transaction
  try {
    // Fetching order status from Cashfree service
    const order_status = await cashfreeService.getPaymentStatus(orderId);
    console.log(order_status);

    if (!order_status) {
      throw new Error("Error while retrieving order status from CashfreeService");
    }

    if (order_status !== "PENDING") {
      const order = await Order.findOne({ where: { order_id: orderId } });
      if (!order) {
        throw new Error("Order not found");
      }

      // Update the 
      if (order_status === "SUCCESS") {
        await CharityProjects.update(
          { charityCollected: sequelize.literal(`charityCollected + 88`) },
          {
            where: {
              charity_id: charity_id,
              projectName: charity_project_name,
            },
            transaction: t
          }
        );

        await User.update(
          {totalCharity:sequelize.literal(`totalCharity + 88`)},
          {
            where:{
              id:userId
            }
          },{transaction: t}
        )
        
      }
        await emailService.sendPaymentStatus(order_status);
      // Update order status in order table
      const [result] = await Order.update({ status: order_status }, { where: { order_id: orderId } }, { transaction: t });

      // Only commit changes when all transactions are successful
      await t.commit();

      if (result > 0) {
        console.log("Order status updated successfully");
      } else {
        throw new Error("Payment successful but encountered error while changing order status in database");
      }

      return { message: "Payment Successful", orderStatus: order_status };
    }

    return { message: "Payment status still pending", orderStatus: order_status };
  } catch (err) {
    await t.rollback(); // Rollback transaction if any error occurs
    throw err;
  }
}

module.exports = { createPaymentOrder, getPaymentStatus };
