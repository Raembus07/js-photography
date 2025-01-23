import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "@/styles/calendar.module.css";

//todo button day / month / year doesn't work
//todo ui

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [currentView, setCurrentView] = useState("dayGridMonth"); // Zustand für die aktuelle Ansicht
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

    // Handler für die Änderung der Ansicht
    const handleViewChange = (event) => {
        setCurrentView(event.target.value); // Aktuelle Ansicht ändern
    };

    return (
        <div className={styles.calendarContainer}>
            <h1 className={styles.calendarTitle}>Verfügbarkeit</h1>

            {/* Dropdown-Menü für die Ansichtsauswahl */}
            <div className={styles.viewSelector}>
                <label htmlFor="viewSelect">Ansicht wechseln:</label>
                <select
                    id="viewSelect"
                    value={currentView}
                    onChange={handleViewChange}
                    className={styles.viewSelectorDropdown}>
                    <option value="dayGridDay">Tag</option>
                    <option value="dayGridWeek">Woche</option>
                    <option value="dayGridMonth">Monat</option>
                </select>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView={currentView} // Ansicht wird dynamisch basierend auf dem Zustand festgelegt
                events={events}
                dateClick={handleDateClick}
                editable={false}
                eventClassNames={styles.event}
                viewDidMount={() =>
                    console.log("Aktuelle Ansicht:", currentView)
                }
            />
        </div>
    );
}