const express = require("express");
const DB = require("./config/connection");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../media/build")));
app.get("*",(req, res) =>{
    res.sendFile(path.join(__dirname, "../media/build/index.html"))
});

DB.once("open", ()=>{
    app.listen(PORT, ()=>{
        console.log(`app is now listing on localhost:${PORT}`)
    })
})