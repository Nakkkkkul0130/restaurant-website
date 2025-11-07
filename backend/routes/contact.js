const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create transporter with OAuth2
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form route
router.post('/send', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create message data
    const messageData = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Send email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'nakkul.dev@gmail.com',
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #fe9e0d; border-bottom: 2px solid #fe9e0d; padding-bottom: 10px;">New Contact Message</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Date:</strong> ${messageData.date} at ${messageData.time}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #fe9e0d;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
            This message was sent from the Indian Lounge contact form.<br>
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});



module.exports = router;