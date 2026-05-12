import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const isAdmin = currentUser?.role === "admin";

    const fetchEvents = async () => {
        try {
            const response = await api.get("/events");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleRegister = async (eventId) => {
        if (!currentUser) {
            setMessage("Please log in first.");
            return;
        }

        try {
            const response = await api.post("/registrations", {
                userId: currentUser._id,
                eventId,
            });

            setMessage(response.data.message);
            fetchEvents();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    const handleEdit = (eventId) => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleDelete = async (eventId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/events/${eventId}`);
            setMessage("Event deleted successfully.");
            fetchEvents();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to delete event."
            );
        }
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    return (
        <div>
            <h1>Campus Events</h1>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                events.map((event) => (
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

                        <p>
                            <strong>Seats:</strong>{" "}
                            {event.registeredCount}/{event.capacity}
                        </p>

                        {/* Student Register Button */}
                        {currentUser && !isAdmin && (
                            <button
                                onClick={() => handleRegister(event._id)}
                            >
                                Register
                            </button>
                        )}

                        {/* Admin Edit and Delete Buttons */}
                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => handleEdit(event._id)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(event._id)
                                    }
                                    style={{
                                        marginLeft: "10px",
                                        background:
                                            "linear-gradient(135deg, #ef4444, #dc2626)",
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default EventsPage;