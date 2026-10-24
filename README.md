# EstateHub - Full-Stack Real Estate Web Application

A full-stack real estate web application built with **React** on the frontend and **Node.js (Express)** on the backend.

---

## 📁 Project Architecture

```
realestateWeb/
├── backend/                     # Node.js & Express REST API
│   ├── src/
│   │   ├── config/              # Database connection & configurations
│   │   │   └── db.js
│   │   ├── controllers/         # Business logic & request handling
│   │   │   ├── propertyController.js
│   │   │   └── userController.js
│   │   ├── middleware/          # Custom middlewares (e.g. error handling)
│   │   │   └── errorHandler.js
│   │   ├── routes/              # Express API route declarations
│   │   │   ├── index.js
│   │   │   ├── propertyRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── app.js               # Express application setup
│   │   └── server.js            # Server entrypoint
│   ├── .env.example             # Backend environment variable template
│   ├── .gitignore
│   └── package.json
│
├── frontend/                    # React frontend (Vite)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PropertyCard.jsx
│   │   ├── pages/               # Application views
│   │   │   ├── Home.jsx
│   │   │   ├── Properties.jsx
│   │   │   └── AddProperty.jsx
│   │   ├── services/            # API client service
│   │   │   └── api.js
│   │   ├── App.jsx              # Main React application
│   │   ├── App.css              # Custom styling
│   │   ├── index.css            # Global resets
│   │   └── main.jsx             # React DOM root entrypoint
│   ├── index.html
│   ├── vite.config.js           # Vite config with API proxy
│   ├── .gitignore
│   └── package.json
│
├── .gitignore                   # Root gitignore
├── package.json                 # Root script runner
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

You can install both backend and frontend dependencies using the root helper script:

```bash
npm run install:all
```

Or install them individually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 2. Run the Development Servers

Open two terminal windows:

#### Terminal 1: Backend API
```bash
npm run dev:backend
# Or: cd backend && npm run dev
```
Backend runs on: **`http://localhost:5000`**  
API health check: **`http://localhost:5000/api/health`**

#### Terminal 2: React Frontend
```bash
npm run dev:frontend
# Or: cd frontend && npm run dev
```
Frontend runs on: **`http://localhost:5173`**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/properties` | Get all properties (supports `?type=` & `?location=` filters) |
| `GET` | `/api/properties/:id` | Get single property by ID |
| `POST` | `/api/properties` | Create a new property listing |
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login user |
