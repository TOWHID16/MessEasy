// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the master router from your routes/index.js file
const allRoutes = require('./routes/index');

const app = express();

// --- Middlewares ---

// ✅ UPDATED: This new CORS configuration allows both your local computer
// and your live frontend to connect to the backend.
const allowedOrigins = [
  'http://localhost:5173',
  'https://mess-easy.vercel.app' // Replace with your actual frontend URL if different
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

app.use(express.json());


// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));


// --- API Routes ---
// This line tells your server to use your master router for any URL
// that starts with '/api'. This is the central connection point.
app.use('/api', allRoutes);


// --- Server Startup ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
