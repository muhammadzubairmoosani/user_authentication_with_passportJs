const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../schema");
const bcrypt = require("bcrypt");

const SigninStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (error, user) => {
    if (error) {
      return done(error.message);
    }

    if (!user) {
      return done("User not found!", false);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done("Incorrect password", false);
    }

    return done(null, user);
  });
}
);

module.exports = SigninStrategy;