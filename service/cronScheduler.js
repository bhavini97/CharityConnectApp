const cron = require('node-cron');
const emailService = require('./emailService'); 
const{ User} = require('../models/centralized'); 

// Run every 5 days at 10:00 AM
cron.schedule('0 10 */5 * *', async () => {
  console.log("Cron job running: Sending reminder emails to users");

  try {
    /*  
      this is how it should be. but since many email id are random in my db i will handcore it to send in my email id
    */
    // const users = await User.findAll(); 
    // for (const user of users) {
    //   await emailService.sendReminder(user.email); 
    // }
    await emailService.sendReminder(); 
    console.log(" Reminder emails sent successfully");
  } catch (err) {
    console.error(" Error sending reminder emails:", err);
  }
});
