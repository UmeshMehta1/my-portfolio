const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Test email endpoint
router.post('/test', async (req, res) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      return res.status(500).json({ error: 'Email not configured' });
    }

    const { to, subject, message } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to || process.env.SMTP_USER,
      subject: subject || 'Test Email from Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Test Email</h2>
          <p>${message || 'This is a test email from your portfolio backend.'}</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Send custom email
router.post('/send', async (req, res) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      return res.status(500).json({ error: 'Email not configured' });
    }

    const { to, subject, html, text } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'To and subject are required' });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      html: html || text,
      text: text || html,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

module.exports = router;

