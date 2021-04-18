const passport = require("passport");
const { User } = require("../schema");
const SignupStrategy = require("./signupStrategy");
const SigninStrategy = require("./signinStrategy");

passport.serializeUser((user, done) => {
  done(null, user.mobile);
});

passport.deserializeUser((mobile, done) => {
  User.findOne({ mobile }, (err, user) => {
    done(err, user);
  });
});

passport.use("local-signup", SignupStrategy);
passport.use("local-signin", SigninStrategy);

module.exports = passport;