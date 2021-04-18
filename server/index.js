const express = require('express')
const app = express();
const mongodb = require('./config')
const passport = require('passport')
const cookieSession = require("cookie-session");
const routers = require('./routers')

app.use(express.json())

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        name: "session",
        keys: [
            process.env.REACT_APP_ACCESS_TOKEN_SECRET,
            process.env.REACT_APP_REFRESH_TOKEN_SECRET,
        ],
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(routers)

app.listen(process.env.REACT_APP_PORT, () => console.log(`server listening on port ${process.env.REACT_APP_PORT}`))

mongodb.connection.once("open", () => console.log("database is connected!"));