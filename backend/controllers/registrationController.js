const Registration = require("../models/Registration");
const Event = require("../models/Event");

const registerForEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        if (event.registeredCount >= event.capacity) {
            return res.status(400).json({
                message: "Event is full",
            });
        }

        // Check if the user is already registered
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId,
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "Already registered for this event",
            });
        }

        // Create a new registration
        const registration = await Registration.create({
            user: userId,
            event: eventId,
        });

        // Increase registered count
        event.registeredCount += 1;
        await event.save();

        res.status(201).json({
            message: "Registration successful",
            registration,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: error.message,
        });
    }
};

const cancelRegistration = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        console.log("Cancelling registration:", { userId, eventId });

        // Check if the registration exists
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId,
        });

        if (!existingRegistration) {
            return res.status(404).json({
                message: "Registration not found",
            });
        }

        // Delete the registration
        await Registration.deleteOne({
            _id: existingRegistration._id,
        });

        // Update event count
        const event = await Event.findById(eventId);

        if (event && event.registeredCount > 0) {
            event.registeredCount -= 1;
            await event.save();
        }

        res.json({
            message: "Registration cancelled successfully",
        });
    } catch (error) {
        console.error("Cancel registration error:", error);
        res.status(500).json({
            message: "Failed to cancel registration",
        });
    }
};

module.exports = {
    registerForEvent,
    cancelRegistration,
};