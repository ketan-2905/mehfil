const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const configurePassport = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const tempUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profilePic: profile.photos[0].value,
            temporary: true,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000)
          });
          await tempUser.save();
          return done(null, { ...tempUser.toObject(), needsSignup: true });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

module.exports = configurePassport;