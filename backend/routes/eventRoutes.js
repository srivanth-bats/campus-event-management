const express = require("express");
const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/")
    .post(createEvent)
    .get(getEvents);

router.route("/:id")
    .put(updateEvent)
    .delete(deleteEvent);

module.exports = router;