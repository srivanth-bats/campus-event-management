import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalRegistrations: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersResponse, eventsResponse] = await Promise.all([
                    api.get("/users"),
                    api.get("/events"),
                ]);

                const users = usersResponse.data || [];
                const events = eventsResponse.data || [];

                const totalRegistrations = events.reduce(
                    (sum, event) => sum + (event.registeredCount || 0),
                    0
                );

                setStats({
                    totalUsers: users.length,
                    totalEvents: events.length,
                    totalRegistrations,
                });
            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                <div className="event-card">
                    <h2>{stats.totalUsers}</h2>
                    <p>Total Users</p>
                </div>

                <div className="event-card">
                    <h2>{stats.totalEvents}</h2>
                    <p>Total Events</p>
                </div>

                <div className="event-card">
                    <h2>{stats.totalRegistrations}</h2>
                    <p>Total Registrations</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;