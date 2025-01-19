-- Use the correct database
USE wisdomnet;

-- Drop existing tables if they already exist
DROP TABLE IF EXISTS CallQueue;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Chats;
DROP TABLE IF EXISTS Operators;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Departments;
DROP TABLE IF EXISTS AvailableSlots;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS ContactUs;
DROP TABLE IF EXISTS Branch;

-- Create Branch table
CREATE TABLE Branch (
    BranchID INT PRIMARY KEY IDENTITY(1,1),
    BranchName NVARCHAR(100) NOT NULL,
    Street NVARCHAR(100),
    Location NVARCHAR(255),
    ContactNumber NVARCHAR(15),
    OpeningHours NVARCHAR(50)
);

-- Create Departments table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName NVARCHAR(100) UNIQUE NOT NULL
);

-- Create Operators table
CREATE TABLE Operators (
    OperatorID INT PRIMARY KEY IDENTITY(1,1),
    OperatorName NVARCHAR(100),
    BranchID INT,
    AssignedDepartmentID INT,
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID),
    FOREIGN KEY (AssignedDepartmentID) REFERENCES Departments(DepartmentID)
);

-- Create Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
	Username VARCHAR(100) UNIQUE NOT NULL,
    NRIC CHAR(9) UNIQUE NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL,
	Pin INT NOT NULL,
);

-- Create Chats table with new SocketID column
CREATE TABLE Chats (
    ChatID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    BranchID INT,
    DepartmentID INT,
    OperatorID INT,
    SocketID NVARCHAR(255), -- New SocketID column to store session socket ID
    StartedAt DATETIME DEFAULT GETDATE(),
    EndedAt DATETIME,
    TransferredToCall BIT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID),
    FOREIGN KEY (OperatorID) REFERENCES Operators(OperatorID)
);

-- Create Messages table
CREATE TABLE Messages (
    MessageID INT PRIMARY KEY IDENTITY(1,1),
    ChatID INT,
    SenderType NVARCHAR(20) CHECK (SenderType IN ('user', 'operator')),
    MessageText NVARCHAR(MAX) NOT NULL,
    SentAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChatID) REFERENCES Chats(ChatID)
);

-- Create CallQueue table
CREATE TABLE CallQueue (
    QueueID INT PRIMARY KEY IDENTITY(1,1),
    ChatID INT,
    UserID INT,
    PhoneNumber VARCHAR(20) NOT NULL,
    QueueNumber INT NOT NULL,
    EstimatedWaitTime NVARCHAR(50),
    Status NVARCHAR(20) CHECK (Status IN ('waiting', 'in_call', 'completed')) DEFAULT 'waiting',
    RequestedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ChatID) REFERENCES Chats(ChatID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create ContactUs table
CREATE TABLE ContactUs (
    ContactID INT PRIMARY KEY IDENTITY(1,1),
    MobileNumber NVARCHAR(15) NOT NULL,
    SelectedProblem NVARCHAR(255) NOT NULL,
    QueueNumber INT NOT NULL,
    SubmissionDateTime DATETIME DEFAULT GETDATE()
);

-- Create AvailableSlots table
CREATE TABLE AvailableSlots (
    SlotID INT PRIMARY KEY IDENTITY(1,1),
    BranchID INT FOREIGN KEY REFERENCES Branch(BranchID),
    AppointmentDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    IsBooked BIT DEFAULT 0
);

-- Create Appointment table 
CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    BranchID INT FOREIGN KEY REFERENCES Branch(BranchID),
	UserID INT,
    Reason NVARCHAR(255),
    BookingDateTime DATETIME DEFAULT GETDATE(),
    SlotID INT, 
    FOREIGN KEY (SlotID) REFERENCES AvailableSlots(SlotID),
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Insert sample data into Branch table
INSERT INTO Branch (BranchName, Street, Location, ContactNumber, OpeningHours)
VALUES 
('OCBC Centre Branch', '65 Chulia St', '#01-00, OCBC Centre, Singapore 049513', '6363 3333', 'Mon-Fri: 9.00am to 4.30pm; Sat: 9.00am to 11.30am'),
('Marina Bay Financial Centre Branch', '10 Marina Boulevard', '#01-04, Marina Bay Financial Centre Tower 2, Singapore 018983', '6363 3333', 'Mon-Fri: 9.00am to 4.30pm; Sat: 9.00am to 11.30am'),
('Orchardgateway Branch', '277 Orchard Road, orchardgateway', '#01-16, #B1-12 & #B2-12, Singapore 238858', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('Tiong Bahru Plaza Branch', '302 Tiong Bahru Road', '#01-125/126 Tiong Bahru Plaza, Singapore 168732', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm'),
('ION Orchard Branch', '2 Orchard Turn', '#B2-57, Singapore 238801', '6363 3333', 'Mon-Sun: 11.00am to 7.00pm');

-- Insert departments into Departments table
INSERT INTO Departments (DepartmentName)
VALUES ('Account Services'), ('Fraud Department'), ('Loan Enquiries'), ('Card Services'), ('Miscellaneous');

-- Insert sample users into Users table
INSERT INTO Users (Username, NRIC, Email, Pin) 
VALUES 
('john_doe', 'S1234567A', 'john.doe@example.com', 123456),
('jane_smith', 'T9876543B', 'jane.smith@example.com', 567812),
('alex_brown', 'F7654321C', 'alex.brown@example.com', 901234),
('susan_lee', 'G8765432D', 'susan.lee@example.com', 345678),
('michael_wong', 'S2345678E', 'michael.wong@example.com', 237890);

-- Insert sample operators into Operators table with unique, realistic names
DECLARE @BranchID INT;
DECLARE @DepartmentID INT;

DECLARE BranchCursor CURSOR FOR
SELECT BranchID FROM Branch;

OPEN BranchCursor;
FETCH NEXT FROM BranchCursor INTO @BranchID;

WHILE @@FETCH_STATUS = 0
BEGIN
    DECLARE DepartmentCursor CURSOR FOR
    SELECT DepartmentID FROM Departments;

    OPEN DepartmentCursor;
    FETCH NEXT FROM DepartmentCursor INTO @DepartmentID;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Insert 5 operators per department per branch with unique, realistic names
        INSERT INTO Operators (OperatorName, BranchID, AssignedDepartmentID)
        VALUES 
            ('James Tan', @BranchID, @DepartmentID),
            ('Rachel Lim', @BranchID, @DepartmentID),
            ('David Ng', @BranchID, @DepartmentID),
            ('Siti Rahman', @BranchID, @DepartmentID),
            ('Liam Wong', @BranchID, @DepartmentID),
            ('Amanda Lee', @BranchID, @DepartmentID),
            ('John Koh', @BranchID, @DepartmentID),
            ('Sarah Teo', @BranchID, @DepartmentID),
            ('Benjamin Tan', @BranchID, @DepartmentID),
            ('Nina Lim', @BranchID, @DepartmentID),
            ('Arif Bin Salim', @BranchID, @DepartmentID),
            ('Maya Chia', @BranchID, @DepartmentID),
            ('Matthew Goh', @BranchID, @DepartmentID),
            ('Karen Chan', @BranchID, @DepartmentID),
            ('Wei Ming Chen', @BranchID, @DepartmentID),
            ('Priya Menon', @BranchID, @DepartmentID),
            ('Alex Ho', @BranchID, @DepartmentID),
            ('Nurul Hassan', @BranchID, @DepartmentID),
            ('Josephine Choo', @BranchID, @DepartmentID),
            ('Marcus Lee', @BranchID, @DepartmentID);

        FETCH NEXT FROM DepartmentCursor INTO @DepartmentID;
    END;

    CLOSE DepartmentCursor;
    DEALLOCATE DepartmentCursor;

    FETCH NEXT FROM BranchCursor INTO @BranchID;
END;

CLOSE BranchCursor;
DEALLOCATE BranchCursor;

-- Declare variables for time slot generation
DECLARE @StartDate DATE = '2025-01-01';  -- Start date
DECLARE @EndDate DATE = DATEADD(MONTH, 12, @StartDate);  -- End date (one month later)
DECLARE @CurrentDate DATE;
DECLARE @StartTime TIME;
DECLARE @EndTime TIME;
DECLARE @TimeGap INT = 30;  -- 30-minute slots

-- Generate time slots for each branch
DECLARE BranchSlotCursor CURSOR FOR
SELECT BranchID FROM Branch;

OPEN BranchSlotCursor;
FETCH NEXT FROM BranchSlotCursor INTO @BranchID;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @CurrentDate = @StartDate;

    -- Loop through each date within the one-month period
    WHILE @CurrentDate < @EndDate
    BEGIN
        -- Skip Sundays (Assuming Sunday is non-operational)
        IF DATEPART(WEEKDAY, @CurrentDate) <> 1
        BEGIN
            -- Morning slots (10:00 AM to 12:00 PM)
            SET @StartTime = '10:00';
            WHILE @StartTime < '12:00'
            BEGIN
                SET @EndTime = DATEADD(MINUTE, @TimeGap, @StartTime);
                INSERT INTO AvailableSlots (BranchID, AppointmentDate, StartTime, EndTime, IsBooked)
                VALUES (@BranchID, @CurrentDate, @StartTime, @EndTime, 0);
                SET @StartTime = @EndTime;
            END

            -- Afternoon slots (3:00 PM to 6:00 PM)
            SET @StartTime = '15:00';
            WHILE @StartTime < '18:00'
            BEGIN
                SET @EndTime = DATEADD(MINUTE, @TimeGap, @StartTime);
                INSERT INTO AvailableSlots (BranchID, AppointmentDate, StartTime, EndTime, IsBooked)
                VALUES (@BranchID, @CurrentDate, @StartTime, @EndTime, 0);
                SET @StartTime = @EndTime;
            END
        END

        -- Move to the next day
        SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
    END

    FETCH NEXT FROM BranchSlotCursor INTO @BranchID;
END;

CLOSE BranchSlotCursor;
DEALLOCATE BranchSlotCursor;


