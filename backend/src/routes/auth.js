const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (req.user.needsSignup) {
      res.redirect(`${process.env.FRONTEND_URL}/signup?googleId=${req.user.googleId}&email=${req.user.email}&name=${req.user.name}&profilePic=${req.user.profilePic}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
  }
);

router.post("/complete-signup", async (req, res) => {
  const { googleId, username, phone } = req.body;

  try {
    const user = await User.findOne({ googleId });
    if (!user?.temporary) {
      return res.status(400).json({ error: "Invalid signup process" });
    }

    user.username = username;
    user.phone = phone;
    user.temporary = undefined;
    user.expiresAt = undefined;
    await user.save();

    res.json({ message: "Signup Complete" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/cancel-signup", async (req, res) => {
  try {
    if (req.user?.needsSignup) {
      await User.deleteOne({ googleId: req.user.googleId });
    }
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;