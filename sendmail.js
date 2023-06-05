const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(express.json());

const sendMail = async (cartItems, recipientEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-password",
      },
    });

    let itemsDescription = "";
    cartItems.forEach((item) => {
      itemsDescription += `${item.name}: $${item.price} x ${item.count}\n`;
    });

    const message = {
      from: '"Your Name" <your-email@gmail.com>',
      to: recipientEmail,
      subject: "Order Placed",
      text: `Order details:\n\n${itemsDescription}`,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports=sendMail;