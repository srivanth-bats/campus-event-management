import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [venue, setVenue] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [capacity, setCapacity] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await api.get("/events");
            const event = response.data.find((e) => e._id === id);

            if (event) {
                setTitle(event.title);
                setDescription(event.description);
                setVenue(event.venue);
                setEventDate(event.eventDate.split("T")[0]);
                setCapacity(event.capacity);
            }
        };

        fetchEvent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.put(`/events/${id}`, {
            title,
            description,
            venue,
            eventDate,
            capacity: Number(capacity),
        });

        navigate("/events");
    };

    return (
        <div>
            <h1>Edit Event</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={inputStyle}
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ ...inputStyle, minHeight: "100px" }}
                />

                <input
                    type="text"
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
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    min="1"
                    style={inputStyle}
                />

                <button type="submit">Update Event</button>
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
};

export default EditEventPage;