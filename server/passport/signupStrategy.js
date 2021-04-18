const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../schema");
const bcrypt = require("bcrypt");

const SignupStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (error, user) => {
    if (error) {
      return done(error.message);
    }

    if (user) {
      return done("User already axists");
    }

    if (!user) {
      return User.create({
        username,
        password: bcrypt.hashSync(password, 10),
      })
        .then(() => done(null, false, "Sign-up success"))
        .catch((err) => done(err.message, null));
    }
  });
}
);

module.exports = SignupStrategy;