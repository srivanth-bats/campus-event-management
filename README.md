# Campus Event Management System

A full-stack web application that enables students to discover and register for campus events, while administrators can create, edit, and manage events through a dedicated dashboard.

---

## 📌 Project Overview

The Campus Event Management System streamlines the process of organizing and participating in university events such as hackathons, workshops, seminars, cultural festivals, and competitions.

The system supports two user roles:

* **Student** – Browse events, search and sort them, and register for participation.
* **Administrator** – Manage events and monitor system statistics.

This project was developed as part of a Software Engineering course project.

---

## ✨ Features

### 🔐 Authentication

* User registration (Sign Up)
* User login
* Automatic session persistence using Local Storage
* Logout functionality
* Role-based access control (Student / Admin)

### 👤 User Profile

* View name, email, and role

### 📅 Event Management (Admin)

* Create new events
* Edit existing events
* Delete events

### 🎟 Event Registration (Student)

* Register for events
* Duplicate registration prevention
* Capacity limit enforcement

### 🔎 Event Discovery

* Search events by title
* Sort events by:

  * Date
  * Title
  * Capacity
* Filter events by status

### 📊 Visual Enhancements

* Event status badges (Open / Full)
* Registration progress bars
* Premium dark mode UI with gold accents

### 📈 Dashboard (Admin)

* Total users
* Total events
* Total registrations

### 📋 My Registrations

* View registered events

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Tools

* MongoDB Compass
* Visual Studio Code
* Git & GitHub
* OBS Studio (for project demo recording)

---

## 📂 Project Structure

```text
campus-event-management/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🗃 Database Collections

### Users

Stores student and admin accounts.

### Events

Stores event details including title, venue, date, capacity, and registered count.

### Registrations

Stores the relationship between users and events.

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/campus-event-management.git
cd campus-event-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the Application

```text
http://localhost:5173
```

---

## 🔑 Default Admin Account

If you created an admin user manually:

```text
Email: srivanth@example.com
Password: 123456
```

---

## 👨‍💻 Usage

### Student Workflow

1. Register or log in.
2. Browse available events.
3. Search and sort events.
4. Register for an event.
5. View registered events in My Registrations.
6. View profile details.

### Admin Workflow

1. Log in as admin.
2. Access the dashboard.
3. Create new events.
4. Edit event information.
5. Delete events.
6. Monitor statistics.

## 🎥 Demo Highlights

The application demonstrates:

* Authentication and authorization
* CRUD operations
* Search and sorting
* Dashboard analytics
* Responsive UI design
* MongoDB integration

---

## 🧪 Sample Data

The project includes sample users and events that can be inserted through MongoDB Compass using **Insert Many**.

---

## 📚 Software Engineering Concepts Applied

* Requirement Analysis
* UML Diagrams
* Use Case Modeling
* Activity Diagrams
* Component Diagrams
* State Charts
* MVC Architecture
* RESTful API Design

---

## 🔒 Security Features

* Password storage in the database
* Role-based authorization
* Client-side session management
* Duplicate registration prevention

---

## 🐞 Known Limitations

* Session data is stored in browser local storage
* Email notifications are not implemented
* Password reset is not available

---

## 📈 Learning Outcomes

Through this project, the following concepts were applied:

* Full-stack development
* REST API creation
* Database design
* Frontend routing
* State management
* Git and GitHub version control

---

## 👤 Author

**Srivanth Bathula**
Roll No: **SE23UCSE166**
Mahindra University

---

## 📄 License

This project is developed for educational purposes as part of a university course project.
++++++++++++
