const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");


router.post("/", uploadController.uploadPhotos);



module.exports = router;