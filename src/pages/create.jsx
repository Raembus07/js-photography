import { useRouter } from "next/router";
import styles from "@/styles/calendar.module.css";

export default function Create() {
    const router = useRouter();
    const { date } = router.query;

    const handleBooking = async (e) => {
        e.preventDefault();

        const title = document.querySelector(".titleInput").value;
        const description = document.querySelector(".descriptionInput").value;

        const details = {
            date: date,
            title: title,
            description: description,
        };

        try {
            const response = await fetch("/api/createCallEvent", {
                method: "POST",
                body: JSON.stringify(details),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                alert("Termin erfolgreich gebucht.");
                router.push("/");
            } else {
                throw new Error("Fehler beim Buchen des Termins.");
            }
        } catch (error) {
            console.error(error);
            alert("Fehler beim Buchen des Termins.");
        }
    };

    return (
        <div className={styles.createContainer}>
            <h1 className={styles.createTitle}>Termin buchen</h1>
            <p className={styles.createDate}>
                Gewähltes Datum: <span>{date}</span>
            </p>
            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Titel:</div>
                    <div className={styles.formInput}>
                        <input
                            type="text"
                            className="titleInput"
                            placeholder="Geben Sie den Titel ein"
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Beschreibung:</div>
                    <div className={styles.formInput}>
            <textarea
                className="descriptionInput"
                rows="4"
                placeholder="Geben Sie eine Beschreibung ein"
            ></textarea>
                    </div>
                </div>
                <div className={styles.formActions}>
                    <button
                        className={styles.submitButton}
                        onClick={handleBooking}
                    >
                        Terminwunsch senden
                    </button>
                </div>
            </div>
        </div>
    );
}