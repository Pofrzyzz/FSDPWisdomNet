-- Use the right database
USE wisdomnet

-- Drop existing tables
DROP TABLE IF EXISTS Branch;
DROP TABLE IF EXISTS ContactUs;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS AvailableSlots;

-- Create Branch table
CREATE TABLE Branch (
    BranchID INT PRIMARY KEY IDENTITY(1,1),
    BranchName NVARCHAR(100) NOT NULL,
    Location NVARCHAR(255),
    ContactNumber NVARCHAR(15),
    OpeningHours NVARCHAR(50)
);

-- Create ContactUs table
CREATE TABLE ContactUs (
    ContactID INT PRIMARY KEY IDENTITY(1,1),
    MobileNumber NVARCHAR(15) NOT NULL,
    SelectedProblem NVARCHAR(255) NOT NULL,
    QueueNumber INT NOT NULL,
    SubmissionDateTime DATETIME DEFAULT GETDATE()
);

-- Create Appointment table
CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    BranchID INT FOREIGN KEY REFERENCES Branch(BranchID),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Reason NVARCHAR(255),
    AppointmentDate DATE NOT NULL,
    AppointmentTime TIME NOT NULL,
    BookingDateTime DATETIME DEFAULT GETDATE()
);

-- Create AvailableSlots table (Optional)
CREATE TABLE AvailableSlots (
    SlotID INT PRIMARY KEY IDENTITY(1,1),
    BranchID INT FOREIGN KEY REFERENCES Branch(BranchID),
    AppointmentDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    IsBooked BIT DEFAULT 0
);



-- Insert sample data into Branch table
INSERT INTO Branch (BranchName, Location, ContactNumber, OpeningHours)
VALUES 
('OCBC Centre Branch', '65 Chulia St #01-00, OCBC Centre, Singapore 049513', '6363 3333', 'Mon-Fri: 9.00am to 4.30pm; Sat: 9.00am to 11.30am'),
('Marina Bay Financial Centre Branch', '10 Marina Boulevard #01-04, Marina Bay Financial Centre Tower 2, Singapore 018983', '6363 3333', 'Mon-Fri: 9.00am to 4.30pm; Sat: 9.00am to 11.30am'),
('Orchardgateway Branch', '277 Orchard Road, orchardgateway, #01-16, #B1-12 & #B2-12, Singapore 238858', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Tiong Bahru Plaza Branch', '302 Tiong Bahru Road #01-125/126 Tiong Bahru Plaza, Singapore 168732', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('ION Orchard Branch', '2 Orchard Turn #B2-57, Singapore 238801', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Bedok Branch', '204 Bedok North St 1 #01-403/405/407, Singapore 460204', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Hougang Mall Branch', '90 Hougang Ave 10 #01-01 to 05 Hougang Mall, Singapore 538766', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Jurong East Branch', '50 Jurong Gateway Road #B1-18 Jem, Singapore 608549', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Tampines Branch', '1 Tampines Central 5 #01-02 Tampines CPF Building, Singapore 529508', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Bukit Batok Branch', '634 Bukit Batok Central #01-108, Singapore 650634', '6363 3333', 'Mon-Fri: 9.00am to 4.30pm; Sat: 9.00am to 11.30am');

DECLARE @BranchID INT
DECLARE @StartDate DATE = '2024-11-06'  -- Start date
DECLARE @EndDate DATE = DATEADD(MONTH, 1, @StartDate)  -- End date (one month later)
DECLARE @CurrentDate DATE
DECLARE @StartTime TIME
DECLARE @EndTime TIME
DECLARE @TimeGap INT = 30  -- 30-minute slots

-- Loop through each branch
DECLARE BranchCursor CURSOR FOR
SELECT BranchID FROM Branch

OPEN BranchCursor
FETCH NEXT FROM BranchCursor INTO @BranchID

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @CurrentDate = @StartDate

    -- Loop through each date within the one-month period
    WHILE @CurrentDate < @EndDate
    BEGIN
        -- Skip Sundays (Assuming Sunday is non-operational)
        IF DATEPART(WEEKDAY, @CurrentDate) <> 1
        BEGIN
            -- Morning slots (10:00 AM to 12:00 PM)
            SET @StartTime = '10:00'
            WHILE @StartTime < '12:00'
            BEGIN
                SET @EndTime = DATEADD(MINUTE, @TimeGap, @StartTime)
                INSERT INTO AvailableSlots (BranchID, AppointmentDate, StartTime, EndTime, IsBooked)
                VALUES (@BranchID, @CurrentDate, @StartTime, @EndTime, 0)
                SET @StartTime = @EndTime
            END

            -- Afternoon slots (3:00 PM to 6:00 PM)
            SET @StartTime = '15:00'
            WHILE @StartTime < '18:00'
            BEGIN
                SET @EndTime = DATEADD(MINUTE, @TimeGap, @StartTime)
                INSERT INTO AvailableSlots (BranchID, AppointmentDate, StartTime, EndTime, IsBooked)
                VALUES (@BranchID, @CurrentDate, @StartTime, @EndTime, 0)
                SET @StartTime = @EndTime
            END
        END

        -- Move to the next day
        SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate)
    END

    FETCH NEXT FROM BranchCursor INTO @BranchID
END

CLOSE BranchCursor
DEALLOCATE BranchCursor

