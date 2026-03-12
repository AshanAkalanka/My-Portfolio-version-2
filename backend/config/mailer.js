const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function sendContactMail({ name, email, subject, message }) {
    return transporter.sendMail({
        from: `"Contact Form" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO || process.env.MAIL_USER,
        replyTo: email,
        subject: subject || `New message from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `.trim(),
    });
}

module.exports = { sendContactMail };