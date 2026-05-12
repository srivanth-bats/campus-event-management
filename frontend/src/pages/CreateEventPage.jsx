import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEventPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [capacity, setCapacity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/events", {
                title,
                description,
                venue,
                eventDate,
                capacity: Number(capacity),
            });

            navigate("/events");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create event");
        }
    };

    return (
        <div>
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={inputStyle}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ ...inputStyle, minHeight: "100px" }}
                />

                <input
                    type="text"
                    placeholder="Venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    min="1"
                    style={inputStyle}
                />

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
};

export default CreateEventPage;