const express = require('express');
const router = express.Router();
const db = require("../models/");

// Get all media
router.get("/api/media", (req, res) => {
    // const allMedia = await db.findAll();
    // res.status(200).send(JSON.stringify(allMedia));
    db.findAll()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })    
});

// Add a media
router.post("/api/media", (req, res) => {

});

// Delete a media
router.post("/api/media/:id", (req, res) => {

});

// Update a media
router.put("/api/media/:id", (req, res) => {

});


module.exports = router;