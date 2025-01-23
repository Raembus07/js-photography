import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, subject, topic, package: packageName, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Please fill out all required fields." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "raembus@gmail.com",
                pass: "!FWjhWN%PUh6bQ&7anZ2"
            }
        });

        try {
            const mailOptions = {
                from: `"${name}" <${email}>`,
                to: "josia.schweizer.work@gmail.com",
                subject: subject,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Topic:</strong> ${topic || "None"}</p>
                    <p><strong>Package:</strong> ${packageName || "None"}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ success: true, message: "Email sent successfully!" });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Failed to send email. Please try again later." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}