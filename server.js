const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const db = require("./models");
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./media/public"));

//Add API routes here
//require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

// User Table
//  Columns: ID, Username, Password, email(?)

//Media Table
//  Columns: ID, type, title, author/artist, location



