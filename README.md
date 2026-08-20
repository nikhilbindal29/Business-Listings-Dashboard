# Business Listings Dashboard

A modern **full-stack Business Listings Dashboard** built with **React.js** and **FastAPI** for managing, analyzing, and visualizing business data. The application provides a clean dashboard with interactive charts, CRUD operations, advanced filtering, and data export functionality.

This project demonstrates practical full-stack development skills, including REST API development, frontend-backend integration, data visualization, responsive UI design, and business data management.

This dashboard is designed to handle large datasets efficiently. While the sample data is included for demonstration, it can scale to much larger datasets without requiring changes to the application logic.

---

# Features

### Dashboard

* Business Statistics Cards
* City-wise Business Distribution (Top 10)
* Category-wise Business Distribution (Top 10)
* Source-wise Business Distribution (Top 10)
* Interactive Charts using Chart.js

### Business Management

* Add New Business
* Edit Existing Business
* Delete Business
* View Complete Business Listings

### Search & Filtering

* Search businesses by name
* Filter by City
* Filter by Category
* Filter by Source
* Real-time filtering

### Data Export

* Export filtered records to Excel (.xlsx)
* Export filtered records to CSV (.csv)

### User Experience

* Responsive Design
* Professional Dashboard Layout
* Pagination
* Modern UI Components
* Fast Data Loading

---

# Technology Stack

## Frontend

* React.js
* Axios
* Chart.js
* React Chart.js 2
* HTML5
* CSS3
* XLSX

## Backend

* FastAPI
* Python
* Pandas
* Uvicorn

## Development Tools

* Git
* GitHub
* Visual Studio Code

---

# Project Structure

```text
Business-Listings-Dashboard
│
├── backend
│   ├── main.py
│   ├── business_listings_clean.csv
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar
│   │   │   ├── StatsCards
│   │   │   ├── CityChart
│   │   │   ├── CategoryChart
│   │   │   ├── SourceChart
│   │   │   ├── BusinessTable
│   │   │   └── AddBusiness
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md
```

---

# Dashboard Modules

## Statistics Cards

Displays important business insights including total businesses, cities, categories, and sources.

## City Wise Businesses

Displays the **Top 10 cities** with the highest number of businesses using a vertical bar chart.

## Category Distribution

Displays the **Top 10 business categories** based on business count.

## Source Distribution

Displays the **Top 10 business sources** using a professional horizontal bar chart.

## Business Listings

Provides a searchable and filterable table with pagination.

Features include:

* Search
* Filter
* Edit
* Delete
* Export

---

# REST API Endpoints

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| GET    | `/business-list`        | Retrieve all business records     |
| POST   | `/add-business`         | Add a new business                |
| PUT    | `/update-business/{id}` | Update an existing business       |
| DELETE | `/delete-business/{id}` | Delete a business                 |
| GET    | `/city-count`           | City-wise business statistics     |
| GET    | `/category-count`       | Category-wise business statistics |
| GET    | `/source-count`         | Source-wise business statistics   |
| GET    | `/stats`                | Dashboard summary statistics      |

---

# Installation

## Clone the Repository

```bash
git clone <repository-url>
cd Business-Listings-Dashboard
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# Project Highlights

* Full-Stack Web Application
* RESTful API Development
* CRUD Operations
* Interactive Dashboard
* Data Visualization
* React Hooks
* FastAPI Backend
* Dynamic Filtering
* Search Functionality
* Pagination
* Excel & CSV Export
* Responsive User Interface
* Component-Based Architecture
* Clean and Maintainable Code

---

# Future Improvements

* User Authentication
* Role-Based Access Control
* Business Logo/Image Upload
* Import Businesses from Excel
* PDF Report Generation
* Dashboard Analytics
* Dark Mode
* Database Integration (MySQL/PostgreSQL)
* Docker Deployment
---
# License

This project is intended for educational and interview demonstration purposes.
---
# Author

**Nikhil Bindal**
---


