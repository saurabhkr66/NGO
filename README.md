# NGO Monthly Reporting Dashboard

A full-stack application for NGOs to submit monthly reports and for admins to monitor aggregated monthly data.

---

## 🌐 Live Demo

**Deployed Link**: [https://your-deployment-url.com](https://your-deployment-url.com)  

---

## 🧰 Tech Stack

- **Frontend**: Next.js (React Framework)
- **Backend**: Next.js API routes (Node.js + Express-like)
- **Database**: MongoDB (using Mongoose)

---

## 📦 Features

### ✍️ Report Submission Page

Form fields:
- NGO ID (Text)
- Month (YYYY-MM)
- People Helped (Number)
- Events Conducted (Number)
- Funds Utilized (Number)

> ✅ Submits data to backend via `POST /api/report`

---

### 🛠 Admin Dashboard

Displays aggregated report data for a selected month:
- Total NGOs Reporting
- Total People Helped
- Total Events Conducted
- Total Funds Utilized

> ✅ Fetches data via `GET /api/dashboard?month=YYYY-MM`

---

## 🛠️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ngo-report-dashboard.git
   cd ngo-report-dashboard
