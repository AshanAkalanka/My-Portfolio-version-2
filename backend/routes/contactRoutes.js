const express = require("express");
const router = express.Router();
const { sendContactMail } = require("../config/mailer");

// POST /api/contact
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await sendContactMail({ name, email, subject, message });

        return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Email send error:", err);
        return res.status(500).json({ success: false, message: "Failed to send message" });
    }
});

module.exports = router;