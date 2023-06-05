const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const apiData = require('./data.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/service", (req, res) => {
  res.send(apiData);
});

const sendMail = async (cartItems, recipientEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "jatanraaj@gmail.com", // Replace with your Gmail email address
        pass: "gfvhonyerddbfejn", // Replace with your Gmail password
      },
    });

    let itemsDescription = "";
    cartItems.forEach((item) => {
      itemsDescription += `${item.name}: $${item.price} x ${item.count}\n`;
    });

    const message = {
      from: '"Your Name" <your-email@gmail.com>', // Replace with your name and email address
      to: recipientEmail,
      subject: "Order Confirmation",
      text: `Dear Customer ,
  
  Thank you for placing an order with us. We are pleased to inform you that your order has been successfully placed.

  Order Details:
  ${itemsDescription}
  
  Please review the order details provided above for accuracy. If you have any questions or concerns, feel free to reach out to our customer support team.
  
  We will notify you via email once your order has been processed and shipped. Your patience is appreciated during this time.
  
  Thank you for choosing us for your purchase!
  
  Best regards,
  Petisam,`,
    };

    let info = await transporter.sendMail(message);
    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendMessage = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "jatanraaj@gmail.com", // Replace with your Gmail email address
        pass: "gfvhonyerddbfejn", // Replace with your Gmail password
      },
    });

    const mailOptions = {
      from: '"Your Name" <your-email@gmail.com>', // Replace with your name and email address
      to: email, // Replace with the recipient email address
      subject: "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.post("/send-email", async (req, res) => {
  const { cartItems, recipientEmail } = req.body;

  try {
    await sendMail(cartItems, recipientEmail);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while sending the email" });
  }
});

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendMessage(name, email, message);
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while sending the message" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
