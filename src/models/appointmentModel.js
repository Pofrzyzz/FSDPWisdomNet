const { sql, poolPromise } = require('../../dbConfig'); 

const createAppointment = async (BranchID, UserID, Reason, BookingDateTime, SlotID) => {
    let pool, transaction;
    try {
        pool = await poolPromise;
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        const request = new sql.Request(transaction);

        // Check if the slot is available
        const checkSlotQuery = `
            SELECT IsBooked 
            FROM AvailableSlots 
            WHERE SlotID = @SlotID AND IsBooked = '0'
        `;

        const slotResult = await request
            .input('SlotID', sql.Int, SlotID)
            .query(checkSlotQuery);

            if (slotResult.recordset.length === 0) {
            await transaction.rollback();
            return { error: 'Selected time slot is already booked or unavailable' };
        }

        // Insert appointment record
        const insertAppointmentQuery = `
            INSERT INTO Appointment (BranchID, UserID, Reason, BookingDateTime, SlotID)
            VALUES (@BranchID,@UserID, @Reason, @BookingDateTime, @SlotID)
        `;
        await request
            .input('BranchID', sql.Int, BranchID)
            .input('UserID', sql.Int, UserID)
            .input('Reason', sql.NVarChar(255), Reason)
            .input('BookingDateTime', sql.DateTime, BookingDateTime)
            .query(insertAppointmentQuery);

        // Update the slot to mark it as booked
        const updateSlotQuery = `
            UPDATE AvailableSlots 
            SET IsBooked = 1 
            WHERE SlotID = @SlotID
        `;
        await request.query(updateSlotQuery);

        // Commit the transaction
        await transaction.commit();

        return { success: 'Appointment created successfully' };

    } catch (error) {
        if (transaction) await transaction.rollback();
        return { error: error.message };
    }
};

module.exports = { createAppointment };
