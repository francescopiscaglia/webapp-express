const express = require("express");
const router = express.Router();
const FilmsController = require("../controllers/FilmsController.js");

// movies index
router.get("/", FilmsController.index);

// categories index
router.get("/categories", FilmsController.CategoriesIndex);

// show
router.get("/:id", FilmsController.show);

// create
router.post("/:id/review", FilmsController.create);

// delete
router.delete("/:id/review", FilmsController.destroy)

module.exports = router