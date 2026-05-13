import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleCancelRegistration = async (eventId) => {
        if (!currentUser) {
            setMessage("Please log in first.");
            return;
        }

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel your registration?"
        );

        if (!confirmCancel) return;

        try {
            const response = await api.delete("/registrations", {
                data: {
                    userId: currentUser._id,
                    eventId,
                },
            });

            setMessage(response.data.message);
            fetchEvents();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to cancel registration"
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
                error.response?.data?.message ||
                "Failed to delete event."
            );
        }
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    // Filter events by search term
    const filteredEvents = events.filter((event) =>
        (event.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
    );

    // Sort the filtered events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        }

        if (sortBy === "capacity") {
            return a.capacity - b.capacity;
        }

        // Default: sort by date
        return new Date(a.eventDate) - new Date(b.eventDate);
    });

    return (
        <div>
            <h1>Campus Events</h1>

            {/* Search Bar */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search events by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Sort Dropdown */}
            <div style={{ marginBottom: "20px" }}>
                <label
                    style={{
                        marginRight: "10px",
                        fontWeight: "600",
                    }}
                >
                    Sort By:
                </label>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                    }}
                >
                    <option value="date">Date</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="capacity">Capacity</option>
                </select>
            </div>

            {/* Messages */}
            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {/* Event List */}
            {events.length === 0 ? (
                <p>No events available.</p>
            ) : sortedEvents.length === 0 ? (
                <p>No matching events found.</p>
            ) : (
                sortedEvents.map((event) => (
                    <div
                        key={event._id}
                        className="event-card"
                    >
                        <h2>{event.title}</h2>

                        {/* Status Badge */}
                        <div
                            style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                marginBottom: "10px",
                                backgroundColor:
                                    event.registeredCount >= event.capacity
                                        ? "#fee2e2"
                                        : "#dcfce7",
                                color:
                                    event.registeredCount >= event.capacity
                                        ? "#dc2626"
                                        : "#16a34a",
                            }}
                        >
                            {event.registeredCount >=
                                event.capacity
                                ? "Full"
                                : "Open"}
                        </div>

                        <p>{event.description}</p>

                        <p>
                            <strong>Venue:</strong>{" "}
                            {event.venue}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(
                                event.eventDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Seats:</strong>{" "}
                            {event.registeredCount}/
                            {event.capacity}
                        </p>

                        {/* Progress Bar */}
                        <div
                            style={{
                                width: "100%",
                                height: "10px",
                                backgroundColor: "#e5e7eb",
                                borderRadius: "999px",
                                overflow: "hidden",
                                marginTop: "8px",
                                marginBottom: "15px",
                            }}
                        >
                            <div
                                style={{
                                    width: `${(event.registeredCount /
                                        event.capacity) *
                                        100
                                        }%`,
                                    height: "100%",
                                    background:
                                        event.registeredCount >=
                                            event.capacity
                                            ? "linear-gradient(90deg, #ef4444, #dc2626)"
                                            : "linear-gradient(90deg, #22c55e, #16a34a)",
                                    transition:
                                        "width 0.3s ease",
                                }}
                            />
                        </div>

                        {/* Student Buttons */}
                        {currentUser && !isAdmin && (
                            <>
                                <button
                                    onClick={() =>
                                        handleRegister(
                                            event._id
                                        )
                                    }
                                >
                                    Register
                                </button>

                                <button
                                    onClick={() =>
                                        handleCancelRegistration(
                                            event._id
                                        )
                                    }
                                    style={{
                                        marginLeft:
                                            "10px",
                                        background:
                                            "linear-gradient(135deg, #ef4444, #dc2626)",
                                    }}
                                >
                                    Cancel Registration
                                </button>
                            </>
                        )}

                        {/* Admin Buttons */}
                        {isAdmin && (
                            <>
                                <button
                                    onClick={() =>
                                        handleEdit(
                                            event._id
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            event._id
                                        )
                                    }
                                    style={{
                                        marginLeft:
                                            "10px",
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