const moment = require("moment");
const bookingModel = require("../models/historyModel");

const getBookingHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Received userId:", userId); // Debugging log

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const allBookings = await bookingModel.getUserBookings(userId);
        console.log("Fetched bookings:", allBookings); // Debugging log

        if (!allBookings || allBookings.length === 0) {
            return res.status(404).json({ error: "No bookings found for this user." });
        }

        // Get the current date (YYYY-MM-DD) without time
        const currentDate = moment().format("YYYY-MM-DD");
        console.log("Current Date:", currentDate); // Debugging log

        const ongoingBookings = allBookings.filter(booking => {
            if (!booking.DateOfAppointment) return false; // Skip invalid dates
            const bookingDate = moment(booking.DateOfAppointment).format("YYYY-MM-DD");
            return moment(bookingDate).isSameOrAfter(currentDate);
        });

        const pastBookings = allBookings.filter(booking => {
            if (!booking.DateOfAppointment) return false; // Skip invalid dates
            const bookingDate = moment(booking.DateOfAppointment).format("YYYY-MM-DD");
            return moment(bookingDate).isBefore(currentDate);
        });

        console.log("Ongoing:", ongoingBookings, "Past:", pastBookings); // Debugging log

        res.json({ ongoingBookings, pastBookings });
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ error: "Failed to fetch booking history" });
    }
};

module.exports = { getBookingHistory };
