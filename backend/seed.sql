-- Seed script for ModernizedApp CRM database
INSERT INTO Customers (Company, CustNo, Title, FirstName, Initials, LastName, Address1, Address2, City, Postcode, Country, DateOfBirth, SortCode, CreditScore, ScoreDate)
VALUES 
('BNK1', 'CST10001', 'Mr', 'John', 'A', 'Smith', '100 High Street', 'Suite 4', 'London', 'EC1A 1BB', 'United Kingdom', '1985-05-12 00:00:00', '20-00-00', 750, '2023-01-15 00:00:00'),
('BNK1', 'CST10002', 'Ms', 'Sarah', 'M', 'Connor', '45 Victoria Road', '', 'Manchester', 'M1 2WD', 'United Kingdom', '1990-08-22 00:00:00', '20-00-00', 810, '2023-03-10 00:00:00');

INSERT INTO Accounts (Company, CustNo, AccNo, AccType, InterestRate, OverdraftLimit, SortCode, OpenDate, LastStatementDate, NextStatementDate, AvailableBalance, ActualBalance)
VALUES
('BNK1', 'CST10001', 'ACC80001', 'SAVINGS', 2.50, 500.00, '20-00-00', '2020-01-10 00:00:00', '2023-11-01 00:00:00', '2023-12-01 00:00:00', 4500.00, 5000.00),
('BNK1', 'CST10002', 'ACC80002', 'CHECKING', 0.50, 1000.00, '20-00-00', '2021-03-15 00:00:00', '2023-11-01 00:00:00', '2023-12-01 00:00:00', 12000.50, 12000.50);
