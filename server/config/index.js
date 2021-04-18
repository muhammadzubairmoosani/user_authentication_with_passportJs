const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.REACT_APP_DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;