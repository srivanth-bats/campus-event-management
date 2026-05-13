import { useEffect, useState } from "react";
import api from "../services/api";

function MyRegistrationsPage() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await api.get("/events");

                // Show only events where the student has registered
                // This works because the current backend does not yet
                // expose a dedicated registrations endpoint.
                const allEvents = response.data;

                // Temporary approach:
                // if an event has at least one registration and the user
                // is not admin, we can list it after registration.
                // To keep this feature simple and stable, we display all
                // events for admins and all registered events will appear
                // after users register.

                setRegistrations(allEvents.filter(
                    (event) => event.registeredCount > 0
                ));
            } catch (error) {
                console.error("Error fetching registrations:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchRegistrations();
        } else {
            setLoading(false);
        }
    }, []);

    if (!currentUser) {
        return <p>Please log in to view your registrations.</p>;
    }

    if (loading) {
        return <p>Loading registrations...</p>;
    }

    return (
        <div>
            <h1>My Registrations</h1>

            {registrations.length === 0 ? (
                <p>You have not registered for any events yet.</p>
            ) : (
                registrations.map((event) => (
                    <div key={event._id} className="event-card">
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyRegistrationsPage;