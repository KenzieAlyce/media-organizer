const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/*", (req, res) => {
  console.log("Unknown route, redirecting to default");
  res.sendFile("index.html", { root: __dirname + "/build/" });
});

module.exports = router;
