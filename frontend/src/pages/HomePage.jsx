import { Link } from "react-router-dom";

function HomePage() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    return (
        <div>
            {/* Hero Section */}
            <section
                style={{
                    textAlign: "center",
                    padding: "40px 20px 60px",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        background: "rgba(251, 191, 36, 0.12)",
                        border: "1px solid rgba(251, 191, 36, 0.25)",
                        color: "#fbbf24",
                        fontWeight: "600",
                        marginBottom: "20px",
                        fontSize: "0.9rem",
                    }}
                >
                    Campus Event Management System
                </div>

                <h1
                    style={{
                        fontSize: "3.5rem",
                        lineHeight: "1.1",
                        marginBottom: "20px",
                    }}
                >
                    Discover and Manage
                    <br />
                    Campus Events
                </h1>

                <p
                    style={{
                        maxWidth: "700px",
                        margin: "0 auto 35px",
                        fontSize: "1.15rem",
                        color: "#a1a1aa",
                    }}
                >
                    A complete platform for students and administrators to create,
                    organize, and register for technical, cultural, and academic events.
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <Link to="/events" style={primaryButton}>
                        Explore Events
                    </Link>

                    {!user && (
                        <Link to="/register" style={secondaryButton}>
                            Create Account
                        </Link>
                    )}
                </div>
            </section>

            {/* Statistics Section */}
            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "40px",
                }}>
                <StatCard number="24+" label="Active Events" />
                <StatCard number="500+" label="Student Registrations" />
                <StatCard number="10+" label="Event Categories" />
            </section>

            {/* Features Section */}
            <section>
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    Key Features
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "20px",
                    }}
                >
                    <FeatureCard
                        title="Student Registration"
                        description="Students can browse and register for campus events in one click."
                    />
                    <FeatureCard
                        title="Admin Dashboard"
                        description="Administrators can monitor users, events, and registrations."
                    />
                    <FeatureCard
                        title="Event Management"
                        description="Create, edit, and delete events with full control."
                    />
                    <FeatureCard
                        title="Search and Sort"
                        description="Quickly find events using filters and sorting tools."
                    />
                </div>
            </section>
        </div>
    );
}

function StatCard({ number, label }) {
    return (
        <div className="event-card" style={{ textAlign: "center" }}>
            <h2
                style={{
                    fontSize: "2.5rem",
                    color: "#fbbf24",
                    marginBottom: "8px",
                }}
            >
                {number}
            </h2>
            <p>{label}</p>
        </div>
    );
}

function FeatureCard({ title, description }) {
    return (
        <div className="event-card">
            <h2 style={{ fontSize: "1.2rem" }}>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

const primaryButton = {
    display: "inline-block",
    padding: "14px 28px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #fbbf24, #d97706)",
    color: "#111111",
    textDecoration: "none",
    fontWeight: "700",
};

const secondaryButton = {
    display: "inline-block",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    background: "rgba(251, 191, 36, 0.08)",
    color: "#fbbf24",
    textDecoration: "none",
    fontWeight: "700",
};

export default HomePage;
