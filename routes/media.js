const express = require("express");
const router = express.Router();
const { Media } = require("../models/");

// Get all media
router.get("/api/media", (req, res) => {
  Media.findAll({
    attributes: [
      "id",
      "media_name",
      "media_type",
      "media_artist",
      "media_location",
      "media_rating",
      "user_id",
    ],
  })
    .then((mediaData) => res.json(mediaData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add a media
router.post("/api/media", (req, res) => {
  Media.create(req.body)
    .then((mediaData) => res.json(mediaData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a media
router.delete("/api/media/:id", (req, res) => {
  Media.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((mediaData) => {
      if (!mediaData) {
        res.status(404).json({ message: "No Media found with this id" });
        return;
      }
      res.json(mediaData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a media
router.put("/api/media/:id", (req, res) => {
  Media.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((mediaData) => {
      if (!mediaData[0]) {
        res.status(404).json({ message: "No media found with this id" });
        return;
      }
      res.json(mediaData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
