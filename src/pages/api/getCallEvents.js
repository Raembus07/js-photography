export default async function handler(req, res) {
    const API_KEY = process.env.CALL_API_KEY;

    try {
        const response = await fetch("https://api.call.com/v1/appointments", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Termine");
        }

        const data = await response.json();

        const formattedEvents = data.appointments.map((item) => ({
            title: "Besetzt",
            start: item.start_time,
            end: item.end_time,
            backgroundColor: "#ff4d4d",
        }));

        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error("Fehler:", error);
        res.status(500).json({ error: "Fehler beim Abrufen der Termine" });
    }
}