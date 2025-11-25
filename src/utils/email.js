const nodemailer = require("nodemailer");

// Configure email transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send reset code to user
async function sendResetCode(email, code) {
    await transporter.sendMail({
        from: `"VitalCare Reset" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Code",
        html: `
      <h2>Password Reset</h2>
      <p>Your reset code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes.</p>
    `
    });
}

module.exports = { sendResetCode };
