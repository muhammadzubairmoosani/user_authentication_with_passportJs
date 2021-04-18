const express = require("express");
const router = express.Router();
const passport = require("../passport");

router.get("/logged-in", (req, res) => {
    if (req.user) return res.send(req.user);
    return res.send(false);
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local-signin", (error, user) => {
        if (error) {
            return res.status(500).json({
                message: error || "Internel server error",
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    message: err || "Internel server error",
                });
            }

            const newUser = user.toObject();
            delete newUser.password;
            newUser.isAuthenticated = true;
            return res.json(newUser);
        });
    })(req, res, next);
});


router.post("/signup", (req, res, next) => {
    passport.authenticate("local-signup", (error, data, message) => {
        if (error) {
            return res.status(500).json({
                message: error || "Internal server error",
            });
        }

        return res.json({ message });
    })(req, res, next);
});


router.get("/logout", (req, res) => {
    req.logOut();
    res.json({ message: "Sign-out scccess" });
});

const authRoutes = router;

module.exports = authRoutes;
