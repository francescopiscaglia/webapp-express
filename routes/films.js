const express = require("express");
const router = express.Router();
const FilmsController = require("../controllers/FilmsController.js");

// index
router.get("/", FilmsController.index);

// show
router.get("/:id", FilmsController.show);

// create
router.post("/:id/review", FilmsController.create);


module.exports = router