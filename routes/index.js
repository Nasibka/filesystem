const express = require("express");
const router = express.Router();

router.use("/savePhotos", require("./savePhotos"));

module.exports = router;