const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();
app.use(express.json()); // To handle JSON data from frontend
// Update session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute session timeout
}));

// Add cleanup endpoint for frontend to call when leaving signup page
app.post("/auth/cancel-signup", async (req, res) => {
  if (req.user?.needsSignup) {
    await User.deleteOne({ googleId: req.user.googleId });
  }
  req.session.destroy();
  res.sendStatus(200);
});
app.use(passport.initialize());
app.use(passport.session());

// MongoDB User Model
const User = mongoose.model("User", new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  profilePic: String,
  phone: String,      // Extra signup field
  username: String,   // Extra signup field
}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/authDB");

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const tempUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePic: profile.photos[0].value,
        temporary: true,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minute expiration
      });
      await tempUser.save();
      return done(null, { ...tempUser.toObject(), needsSignup: true });
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (req.user.needsSignup) {
      res.redirect(`http://localhost:5173/signup?googleId=${req.user.googleId}&email=${req.user.email}&name=${req.user.name}&profilePic=${req.user.profilePic}`);
    } else {
      res.redirect("http://localhost:5173/dashboard");
    }
  }
);

// Handle Extra Signup Fields
app.post("/auth/complete-signup", async (req, res) => {
  const { googleId, username, phone } = req.body;
  
  const user = await User.findOne({ googleId });
  if (!user?.temporary) {
    return res.status(400).json({ error: "Invalid signup process" });
  }

  // Remove temporary fields and save
  user.username = username;
  user.phone = phone;
  user.temporary = undefined;
  user.expiresAt = undefined;
  await user.save();

  res.json({ message: "Signup Complete" });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
