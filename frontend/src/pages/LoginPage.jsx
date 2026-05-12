import { useState } from "react";
import api from "../services/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            // Save user data locally
            setEmail("");
            setPassword("");
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/";
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div>
            <h1>Login</h1>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {user ? (
                <div className="event-card">
                    <h2>Welcome, {user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "15px" }}>
                        <label>Email</label>
                        <br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                            }}
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
}

export default LoginPage;