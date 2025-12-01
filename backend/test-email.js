// Quick test script for email functionality
require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
  console.log('🧪 Testing email configuration...\n');

  // Check environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Email configuration missing!');
    console.log('Please set SMTP_USER and SMTP_PASS in .env file');
    process.exit(1);
  }

  console.log('✅ Email credentials found');
  console.log(`📧 From: ${process.env.SMTP_USER}\n`);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify connection
  try {
    console.log('🔌 Verifying connection...');
    await transporter.verify();
    console.log('✅ Email server connection verified!\n');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check your Gmail App Password is correct');
    console.log('2. Make sure there are no extra spaces in the password');
    console.log('3. Verify 2-factor authentication is enabled on your Gmail account');
    process.exit(1);
  }

  // Send test email
  try {
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: '✅ Portfolio Email Test - Success!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981;">🎉 Email Configuration Successful!</h2>
          <p>Your portfolio email system is working correctly.</p>
          <p>This is a test email sent from your portfolio backend.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Configuration:</strong></p>
            <ul>
              <li>Service: Gmail</li>
              <li>Email: ${process.env.SMTP_USER}</li>
              <li>Status: ✅ Active</li>
            </ul>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      text: `
🎉 Email Configuration Successful!

Your portfolio email system is working correctly.
This is a test email sent from your portfolio backend.

Configuration:
- Service: Gmail
- Email: ${process.env.SMTP_USER}
- Status: ✅ Active

Sent at: ${new Date().toLocaleString()}
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📬 Check your inbox: ${process.env.SMTP_USER}\n`);
    console.log('🎉 Email system is ready to use!');
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    console.log('\n💡 Common issues:');
    console.log('- Invalid App Password');
    console.log('- Gmail security settings');
    console.log('- Network connectivity');
    process.exit(1);
  }
};

testEmail();

