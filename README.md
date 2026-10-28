# EstateHub & RealtyPro - Full-Stack Real Estate Marketplace & Admin Suite

A complete real estate ecosystem built for the **Tricity Market** (Chandigarh, Mohali, Panchkula, Zirakpur, New Chandigarh), featuring:
1. **Frontend Marketplace (`frontend/`)**: High-trust buyer portal with comparison drawer, contextual site visit lead capture, multi-image listing creator, and locality guides.
2. **Admin Panel & CRM (`adminPanel/`)**: Dedicated management dashboard embodying modern real estate UX (Home Lengo + RealtyPro styles), featuring dynamic listings inventory with status workflows (Approved, Pending, Sold), Sales Pipeline Kanban board, AI Insights, interactive Page Insights visitor graph, client inquiries, reviews, and messaging.
3. **Backend REST API (`backend/`)**: Node.js & Express API with full CRUD for property listings, status updates, deals pipeline, and lead capture.

---

## 📁 Project Architecture

```
tricityProperties/
├── backend/                     # Node.js & Express REST API (Port 5000)
│   ├── src/
│   │   ├── config/              # Database configurations
│   │   ├── controllers/         # propertyController & crmController
│   │   ├── middleware/          # Error handlers & logger
│   │   ├── routes/              # /properties, /crm, /users
│   │   ├── app.js               # Express application setup
│   │   └── server.js            # Server entrypoint
│   └── package.json
│
├── frontend/                    # Buyer Portal (Vite + React 19, Port 5173)
│   ├── src/
│   │   ├── components/          # Navbar, Footer, PropertyCard, Comparison, LeadModal
│   │   ├── pages/               # Home, Properties, Localities, Principles, AddProperty
│   │   ├── services/            # api.js with resilient offline fallback
│   │   └── App.jsx
│   └── package.json
│
├── adminPanel/                  # Admin & CRM Suite (Vite + React 19, Port 5174)
│   ├── src/
│   │   ├── components/          # Sidebar, Topbar, StatCard, PageInsightsChart, AIInsights
│   │   ├── pages/               # DashboardOverview, PropertiesManagement, DealsPipeline, ClientsLeads, Reviews, Messages, Insights
│   │   ├── services/            # adminApi.js with offline persistence & REST client
│   │   └── App.jsx
│   └── package.json
│
├── package.json                 # Root script orchestrator
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Install All Dependencies

Install backend, frontend, and admin panel dependencies in one command:

```bash
npm run install:all
```

Or install them individually:
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin Panel
cd ../adminPanel && npm install
```

---

### 2. Run the Development Servers

You can launch all three servers concurrently or individually:

#### Option A: Run Everything Concurrently
```bash
npm run dev:all
```

#### Option B: Run Individually
- **Backend API (Port 5000)**:
  ```bash
  npm run dev:backend
  ```
- **Frontend Marketplace (Port 5173)**:
  ```bash
  npm run dev:frontend
  ```
- **Admin Panel & CRM (Port 5174)**:
  ```bash
  npm run dev:admin
  ```

---

## 🖥️ Application Previews & Ports

| Application | Port | Description |
|---|---|---|
| **Frontend Marketplace** | `http://localhost:5173` | Buyer portal with multi-city search, 3-way compare, and site visit booking |
| **Admin Panel & CRM** | `http://localhost:5174` | Admin dashboard with New Listings, Deals Kanban, AI Insights & Analytics |
| **Backend REST API** | `http://localhost:5000` | REST API endpoints for properties, deals, leads, and reviews |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/properties` | Get all properties (supports `?type=`, `?city=`, `?location=` filters) |
| `GET` | `/api/properties/:id` | Get single property by ID |
| `POST` | `/api/properties` | Create a new property listing |
| `PUT` | `/api/properties/:id` | Update property listing |
| `PATCH` | `/api/properties/:id/status` | Update property status (`Approved`, `Pending`, `Sold`) |
| `DELETE` | `/api/properties/:id` | Delete property listing |
| `GET` | `/api/crm/deals` | Get all sales pipeline deals |
| `POST` | `/api/crm/deals` | Add deal to pipeline |
| `PATCH` | `/api/crm/deals/:id/stage` | Move deal stage (`New Lead`, `Viewing Scheduled`, etc.) |
| `GET` | `/api/crm/leads` | Get customer site visit leads |
| `POST` | `/api/crm/leads` | Create new customer lead |
| `GET` | `/api/crm/reviews` | Get customer reviews & ratings |
| `GET` | `/api/crm/messages` | Get buyer inquiries & communications |
