// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the master router from your routes/index.js file
const allRoutes = require('./routes/index');

const app = express();

// --- Middlewares ---

// ✅ UPDATED: This now allows requests from ANY origin.
// This is useful for debugging but should be changed back to a specific list for production.
app.use(cors());

app.use(express.json());


// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));


// --- API Routes ---
// This line tells your server to use your master router for any URL
// that starts with '/api'.
app.use('/api', allRoutes);


// --- Server Startup ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
