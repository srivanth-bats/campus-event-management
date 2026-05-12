const Registration = require("../models/Registration");
const Event = require("../models/Event");

const registerForEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.registeredCount >= event.capacity) {
            return res.status(400).json({ message: "Event is full" });
        }

        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId,
        });

        if (existingRegistration) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        const registration = await Registration.create({
            user: userId,
            event: eventId,
        });

        event.registeredCount += 1;
        await event.save();

        res.status(201).json({
            message: "Registration successful",
            registration,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerForEvent,
};