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
        name: "!!! Your application is rejected",
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
  
    sendPaymentStatus : async(status) =>{
        const sender = {
            email: "bkumar221b@gmail.com",
            name: "Payment Details",
          };
          const receivers = [{ email: "bkumar221b@gmail.com" }];
      
          // setting receiver and sender data and content of mail
          await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Payment Status",
            textContent: ` Your payment status is : ${status}`,
          });
      
          return { message: "Notification email sent successfully!" };
        },

        sendReportEmail: async(fileUrl)=>{
            const sender = {
                email: "bkumar221b@gmail.com",
                name: "Report Details",
              };
              const receivers = [{ email: "bkumar221b@gmail.com" }];
          
              // setting receiver and sender data and content of mail
              await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: "Our Weekly Updates",
                textContent: `Hi, How are you doing? This is our weekly updates. We send it to you so that you can take pride of the impact that you have made on our society. this is give you the quick review on how our contributions is being spent.
                Link: ${fileUrl}
                Thanks
                Regards`
                
              });
          
              return { message: "Notification email sent successfully!" };
        },
        sendReminder : async()=>{
            const sender = {
                email: "bkumar221b@gmail.com",
                name: "We miss You!!",
              };
              const receivers = [{ email: "bkumar221b@gmail.com" }];
          
              // setting receiver and sender data and content of mail
              await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'Visit us today',
                textContent: ` <p>Hi there! <br>Don’t forget to check out new charity campaigns happening now.</p>`,
              });
          
              return { message: "Notification email sent successfully!" };
        }
};
