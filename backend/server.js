// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const allRoutes = require('./routes/index');
const app = express();

// --- Middlewares ---
app.use(cors()); // Temporarily allow all origins for deployment
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- API Routes ---
app.use('/api', allRoutes);

// ✅ REMOVED: The app.listen() block is no longer needed for Vercel.

// ✅ ADDED: Export the app object for Vercel
module.exports = app;
