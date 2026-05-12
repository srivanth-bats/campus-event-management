const express = require("express");
const { registerForEvent } = require("../controllers/registrationController");

const router = express.Router();

router.post("/", registerForEvent);

module.exports = router;