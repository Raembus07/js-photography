import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {name, email} = req.body;

        if (!name || !email) {
            return res.status(400).json({error: "Please fill out all required fields."});
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            secure: true,
            port: 465,
            auth: {
                user: 'resend',
                pass: 're_UcMmwbnh_EmwJn3b9E5Pbe2uVgfyn4HCf',
            },
        });

        const autoResponseOptions = await transporter.sendMail({
            from: 'josia.schweizer@gmail.com',
            to: 'raembus@gmail.com',
            subject: 'Thank you for contacting us!',
            html: `
                <h2>Thank you for your message, ${name}!</h2>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p>Best regards,</p>
                <p>Your Company Name</p>
            `
        });

        console.log('Auto-response sent: %s', autoResponseOptions.messageId);
        return res.status(200).json({success: true, message: "Auto-response email sent successfully!"});
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({error: `Method ${req.method} Not Allowed`});
    }
}

handler().catch(console.error);