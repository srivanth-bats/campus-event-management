function ProfilePage() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div>
            <h1>My Profile</h1>

            <div className="event-card">
                <h2>{user.name}</h2>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );
}

export default ProfilePage;