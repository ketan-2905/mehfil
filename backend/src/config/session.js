const session = require("express-session");

const configureSession = (app) => {
  app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
  }));
};

module.exports = configureSession;