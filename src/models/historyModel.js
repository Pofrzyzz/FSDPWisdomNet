const { sql, poolPromise } = require('../../dbConfig');
const getUserBookings = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("userId", sql.Int, userId)
            .query(`
            SELECT 
                B.BranchName AS Branch,
                B.Location,
                S.AppointmentDate AS DateOfAppointment, 
                S.StartTime As TimeOfAppointment,
                A.Reason
            FROM 
                Appointment A
            JOIN 
                Branch B ON A.BranchID = B.BranchID
            JOIN 
                Users U ON A.UserID = U.UserID
            JOIN
                AvailableSlots S ON A.SlotID = S.SlotID 
            WHERE 
                A.UserID = @UserID
            ORDER BY 
                S.AppointmentDate DESC  
            `);

        return result.recordset;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
};

module.exports = {
    getUserBookings,
};
