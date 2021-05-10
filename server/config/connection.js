const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const mongoDb_URI=``;

mongoose.connect(mongoDb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});
module.exports = mongoose.connection;
