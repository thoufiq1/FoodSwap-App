# FoodSwap 🍽️

**Save Food. Feed People. Reduce Waste.**

A web platform that connects donors (college canteens, restaurants, or students) with leftover food to recipients (students, staff, NGOs) to reduce food waste and help the community.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install frontend dependencies:**
```bash
cd frontend
npm install
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Configure environment (optional for demo):**
```bash
cd backend
cp .env.example .env
# Edit .env with your Firebase credentials
```

### Running the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend (new terminal):**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 📁 Project Structure

```
FoodSwap/
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Page components
│   │   └── styles/         # CSS styles
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── src/
│   │   └── index.js        # Main server file
│   ├── .env.example        # Environment template
│   └── package.json
│
└── README.md
```

## 🎨 Features

### For Donors
- ✅ Post donations with food details, quantity, and expiry
- ✅ Track donation status (available/claimed/completed)
- ✅ View donation history
- ✅ See impact statistics

### For Recipients
- ✅ Browse available donations in list or map view
- ✅ Filter by dietary preferences (vegan, vegetarian, halal)
- ✅ Claim donations with one click
- ✅ View claimed donation history

### General
- ✅ Beautiful animations and micro-interactions
- ✅ Real-time notifications
- ✅ Interactive map with donation locations
- ✅ Mobile-responsive design

## 🎯 Demo Accounts

For quick testing, use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Donor | donor@demo.com | any |
| Recipient | recipient@demo.com | any |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/donations | Get available donations |
| POST | /api/donate | Add new donation |
| POST | /api/claim | Claim a donation |
| POST | /api/pickup | Confirm pickup |
| GET | /api/user/:id/donations | Donor history |
| GET | /api/user/:id/claims | Recipient history |
| GET | /api/stats | Platform statistics |

## 🎨 Design

- **Primary Color:** #28A745 (Green)
- **Secondary Color:** #FF7F50 (Orange)
- **Font:** Poppins (headings), Lato (body)
- **Style:** Modern, clean, rounded corners, subtle shadows

## 📦 Tech Stack

### Frontend
- React 19
- React Router 7
- Framer Motion (animations)
- Leaflet (maps)
- Recharts (analytics)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- Firebase Admin SDK (optional)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Render/Railway)
```bash
cd backend
npm start
```

## 📄 License

MIT License - Feel free to use this project for any purpose.

---

Made with ❤️ to reduce food waste and help the community.
