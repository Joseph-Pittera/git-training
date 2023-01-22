const express = require("express");
const router = express.Router();
const mainController = require("./controllers/mainController");

// handle erros globally
const { catchErrors } = require("./handlers/errorHandler");

router.get("/", catchErrors(mainController.homePage));

module.exports = router;
