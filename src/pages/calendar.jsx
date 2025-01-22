import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "@/styles/calendar.module.css";

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/getCallEvents");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Events:", error);
        }
    };

    const handleDateClick = (info) => {
        router.push(`/create?date=${info.dateStr}`);
    };

    return (
        <div className={styles.calendarContainer}>
            <h1 className={styles.calendarTitle}>Verfügbarkeit</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                editable={false}
                eventClassNames={styles.event}
            />
        </div>
    );
}