import nodemailer from "nodemailer";

export default async function handler(req, res) {
    console.log('start send email');
    if (req.method === "POST") {
        const {name, email, subject, topic, package: packageName, message} = req.body;

        if (!name || !email || !subject || !message) {
            console.log("Missing required fields");
            return res.status(400).json({error: "Please fill out all required fields."});
        }

        console.log('create transporter');

        const transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            secure: true,
            port: 465,
            auth: {
                user: 'resend',
                pass: 're_UcMmwbnh_EmwJn3b9E5Pbe2uVgfyn4HCf',
            },
        });

        const mailOptions = await transporter.sendMail({
            from: 'onboarding@resend.dev',
            to: 'josia.schweizer@gmail.com',
            subject: 'Hello World',
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
        });

        console.log('Message sent: %s', mailOptions.messageId);

        // try {
        //     await transporter.sendMail(mailOptions);
        //     console.log("Email sent successfully");
        //     return res.status(200).json({success: true, message: "Email sent successfully!"});
        // } catch (error) {
        //     console.error("Error sending email:", error);
        //     return res.status(500).json({error: "Failed to send email. Please try again later."});
        // }
    } else {
        res.setHeader("Allow", ["POST"]);
        console.log(`Method ${req.method} Not Allowed`);
        return res.status(405).json({error: `Method ${req.method} Not Allowed`});
    }
}

handler().catch(console.error);