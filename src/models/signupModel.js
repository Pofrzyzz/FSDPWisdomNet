const { sql, poolPromise } = require('../../dbConfig');

// Function to sign up a user
const signupUser = async (username, nric, email, pin) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar(100), username)
            .input('nric', sql.Char(9), nric)
            .input('email', sql.VarChar(100), email)
            .input('pin', sql.Int, pin)
            .query(`
                INSERT INTO Users (Username, NRIC, Email, Pin) 
                VALUES (@Username, @NRIC, @Email, @Pin);
            `);

        return { success: true, message: 'User signed up successfully', rowsAffected: result.rowsAffected };
    } catch (error) {
        console.error('Error during signup:', error);
    
        if (error.originalError && error.originalError.info) {
            const sqlError = error.originalError.info.message;
    
            if (sqlError.includes('Violation of UNIQUE KEY constraint')) {
                if (sqlError.includes('Username')) {
                    throw new Error('Username is already taken');
                } else if (sqlError.includes('NRIC')) {
                    throw new Error('NRIC is already registered');
                } else if (sqlError.includes('Email')) {
                    throw new Error('Email is already in use');
                }
            }
        }
    
        throw new Error(`An error occurred during sign-up: ${error.message}`); // Provide a detailed error message
    }
};

module.exports = { signupUser };
