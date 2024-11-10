exports.validateAppointment = (req, res, next) => {
    const { branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID } = req.body;
  
    // Check if all required fields are provided
    if (!branchID || !fullName || !email || !reason || !appointmentDate || !appointmentTime || !slotID) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Validate the email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    // Validate the date format (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(appointmentDate)) {
      return res.status(400).json({ error: 'Invalid date format. Expected format: YYYY-MM-DD' });
    }
  
    // Check if the appointment date is in the future
    const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    if (appointmentDate < today) {
      return res.status(400).json({ error: 'Appointment date must be in the future' });
    }
  
    // Validate the time format (HH:MM)
    const timePattern = /^\d{2}:\d{2}$/;
    if (!timePattern.test(appointmentTime)) {
      return res.status(400).json({ error: 'Invalid time format. Expected format: HH:MM' });
    }
  
    // Ensure slotID is valid 
    if (isNaN(slotID)) {
      return res.status(400).json({ error: 'Invalid slotID' });
    }
  
    next(); 
  };
  