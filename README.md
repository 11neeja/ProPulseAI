# 🏙️ PropulseAI

**PropulseAI** is a real estate intelligence dashboard that helps investors discover high-potential properties using AI-driven insights like risk scoring, yield analysis, and location comparisons. It’s built with a modular architecture using modern frontend and backend frameworks.

---

## 🚀 Features

- 🔍 AI-powered investment scoring (Risk Score, Yield %)
- 📊 Real-time property valuation reports
- 🗺️ Risk maps with geospatial risk insights (e.g., flood zones)
- 📍 City and area-based comparisons
- 🧾 PDF report generation
- 🧠 Data-enhanced decision making using ML analytics

---

## 🌐 Live Demo

https://687e551bfe09508dcd9a26dc--propulseai.netlify.app/

---

## 🧱 Tech Stack

### Frontend
- ⚛️ React + TypeScript
- ⚡ Vite
- 📦 TailwindCSS
- 🗺️ Google Maps API

### Backend
- 🌐 Node.js + Express
- 🧠 Python (for ML logic)
- 🗄️ PostgreSQL
- 📊 Pandas, scikit-learn for analytics
- 📁 Cloudinary (for assets & reports)

---

## ⚙️ Frontend Installation (React + Vite)

```bash
# 1. Navigate to the frontend folder
cd client

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
📌 Ensure you have Node.js v18+ and npm installed.

🖥️ Backend Installation (Node.js + Python ML)
bash

# 1. Navigate to the backend folder
cd server

# 2. Install Node dependencies
npm install

# 3. Set up Python environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 4. Install Python packages
pip install -r requirements.txt

# 5. Start backend server
npm run start
Make sure PostgreSQL and Python 3.10+ are installed and configured.

📦 Environment Variables (.env)
Create a .env file in both client/ and server/ directories with the following keys:

Client (.env)
env

VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
Server (.env)
env

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/propulse
CLOUDINARY_URL=your_cloudinary_api_url

▶️ Usage
Login via secure credentials

Choose a city and filter by yield or risk

Select properties to view AI-summarized valuations

Generate and download PDF reports

Compare risks across cities and zones

📈 Screenshots
Add real screenshots from the UI to enhance this section.

📜 License
MIT License © 2025 Neeja Suva

🙌 Acknowledgements
Google Maps Platform

scikit-learn

Tailwind UI

Vite + React community
