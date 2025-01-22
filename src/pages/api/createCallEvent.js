export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Nur POST-Anfragen erlaubt" });
        return;
    }

    const API_KEY = process.env.CALL_API_KEY;
    const { date, title, description } = req.body;

    try {
        const response = await fetch("https://api.call.com/v1/appointments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                start_time: date,
                description: description,
            }),
        });

        if (!response.ok) {
            throw new Error("Fehler beim Erstellen des Termins");
        }

        res.status(200).json({ message: "Termin erstellt" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Erstellen des Termins" });
    }
}