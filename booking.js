const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "myriadmeta@gmail.com",
    pass: "vqpsnajozbfvthzm",
  },
});

async function sendBookingEmails(bookingInfo) {
  //
  const customerEmail = bookingInfo.email;
  const businessEmail = "myriadmeta@gmail.com";

  const customerMessage = {
    from: "myriadmeta@gmail.com",
    to: customerEmail,
    subject: "Booking Confirmation",
    html: ` <html> <head> <style>
    body{
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.2;
      color: #333;
      background-color: #f2f2f2;
      text-align: center;
    }
    h1{
      font-size: 28px;
      font-weight: bold;
      color: #b58d3c;
      
    }
    h2{
      font-size: 20px;
      font-weight: bold;
      color: #b58d3c;
      text-align: center;
      margin: 20px 0;
    }
    p{
      margin: 0 0 10px 0;
    }
    .container{
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px #b58d3c;
    }
    .btn{
      background-color: #b58d3c;
      color: #fff;
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin: 10px 0;
      display: inline-block;
    }
    .btn:hover{
      background-color: #a16e2c;
    }
    .logo img {
      width: 200px;
      height: 200px;
      }      
  </style>
  <div class="logo">
  <img src="https://media.discordapp.net/attachments/1056481247758663720/1071995112948768828/logoConfirmationEmail.png?width=1368&height=1371" alt="logo">
</div> </head> <body> <h1>Booking Confirmation</h1>
<p>Greetings ${bookingInfo.name},</p>
  <p>We are thrilled to confirm your booking with BCS. Mark your calendars, your pick up is scheduled for the ${bookingInfo.date} at ${bookingInfo.time}. We are all set to make your journey comfortable and memorable!</p>
  <p>Vehicle: ${bookingInfo.vehicle}</p>
  <p>Departing from: ${bookingInfo.origin}</p>
  <p>Arriving at: ${bookingInfo.destination}</p>
  <p>Cost for the journey: $${bookingInfo.totalCost}</p>
  <p>Thank you for choosing BCS. Best regards, The BCS Team</p> </body> </html>`,
  };

  const businessMessage = {
    from: "myriadmeta@gmail.com",
    to: businessEmail,
    subject: "New Booking",
    html: `<html> <head> <style>
    body{
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.2;
      color: #333;
      background-color: #f2f2f2;
      text-align: center;
    }
    h1{
      font-size: 28px;
      font-weight: bold;
      color: #b58d3c;
      
    }
    h2{
      font-size: 20px;
      font-weight: bold;
      color: #b58d3c;
      text-align: center;
      margin: 20px 0;
    }
    p{
      margin: 0 0 10px 0;
    }
    .container{
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px #b58d3c;
    }
    .btn{
      background-color: #b58d3c;
      color: #fff;
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin: 10px 0;
      display: inline-block;
    }
    .btn:hover{
      background-color: #a16e2c;
    }
    .logo img {
      width: 200px;
      height: 200px;
      }      
  </style>
  <div class="logo">
  <img src="https://media.discordapp.net/attachments/1056481247758663720/1071995112948768828/logoConfirmationEmail.png?width=1368&height=1371" alt="logo">
</div> </head> <body> <h1>New Booking</h1> <p>Name: ${bookingInfo.name}</p>
<p>Email: ${customerEmail}</p>
<p>Date: ${bookingInfo.date}</p>
<p>Time: ${bookingInfo.time} </p>
<p>Vehicle: ${bookingInfo.vehicle}</p>
<p>Origin: ${bookingInfo.origin}</p>
<p>Destination: ${bookingInfo.destination}</p>
<p>Total Cost: $${bookingInfo.totalCost}</p></body> </html>`,
  };
  try {
    await transporter.sendMail(customerMessage);
    await transporter.sendMail(businessMessage);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendBookingEmails,
};
