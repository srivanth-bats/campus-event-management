import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                role: "student",
            });

            localStorage.setItem("user", JSON.stringify(response.data));
            setName("");
            setEmail("");
            setPassword("");
            window.location.href = "/";
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Full Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "5px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default RegisterPage;