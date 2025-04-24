const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_SECRET_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

module.exports = {
  organisationStatusChangeNotification: async (status) => {
    const sender = {
      email: "bkumar221b@gmail.com",
      name: "Your Application STATUS Is Changed",
    };
    const receivers = [{ email: "bkumar221b@gmail.com" }];

    // setting receiver and sender data and content of mail
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Status Changed",
      textContent: `Your Application status is : ${status}`,
    });

    return { message: "Notification email sent successfully!" };
  },

  organisationDeleteNotification : async()=>{
    const sender = {
        email: "bkumar221b@gmail.com",
        name: "!!! Your Organisation application is rejected",
      };
      const receivers = [{ email: "bkumar221b@gmail.com" }];
  
      // setting receiver and sender data and content of mail
      await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Your application is rejected",
        textContent: `After the intensive review from our expert teams, we have found many inconsistency in your application. With heavy heart we have to reject your application.
        Regards,
        Team Charity Connect`,
      });
  
      return { message: "Notification email sent successfully!" };
    },
  
};
