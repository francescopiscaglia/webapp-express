const express = require("express");
const router = express.Router();
const FilmsController = require("../controllers/FilmsController.js");

// index
router.get("/", FilmsController.index);


module.exports = router