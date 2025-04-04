// backend/app.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();

// Import configurations and routes
const configPassport = require("./config/passport");
const configSession = require("./config/session");
const authRoutes = require("./routes/auth");
const dbConfig = require("./config/database");

const app = express();

// MongoDB connection
dbConfig.connect();

app.use(express.json());

// Configure session
configSession(app);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);

// Routes
app.use("/auth", authRoutes);

module.exports = app;
