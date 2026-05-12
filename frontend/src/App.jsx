import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";

function App() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/create-event">Create Event</Link>
            )}

            <div
              style={{
                marginLeft: "auto",
                position: "relative",
              }}
            >
              <details>
                <summary
                  style={{
                    color: "#e2e8f0",
                    cursor: "pointer",
                    listStyle: "none",
                    fontWeight: "600",
                    outline: "none",
                  }}
                >
                  {user.name} ▾
                </summary>

                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "35px",
                    background: "#ffffff",
                    borderRadius: "10px",
                    minWidth: "140px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    zIndex: 1000,
                  }}
                >
                  <div
                    onClick={handleLogout}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: "#dc2626",
                      fontWeight: "600",
                    }}
                  >
                    Logout
                  </div>
                </div>
              </details>
            </div>
          </>
        )}
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/edit-event/:id" element={<EditEventPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;