CREATE TABLE IF NOT EXISTS customers (
    cust_no VARCHAR(20) PRIMARY KEY,
    company VARCHAR(10) NOT NULL,
    title VARCHAR(10),
    first_name VARCHAR(50) NOT NULL,
    initials VARCHAR(10),
    last_name VARCHAR(50) NOT NULL,
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    postcode VARCHAR(20),
    country VARCHAR(50),
    dob_dd VARCHAR(2),
    dob_mm VARCHAR(2),
    dob_yy VARCHAR(4),
    sort_code VARCHAR(10),
    credit_score INT DEFAULT 0,
    score_date_dd VARCHAR(2),
    score_date_mm VARCHAR(2),
    score_date_yy VARCHAR(4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
    acc_no VARCHAR(20) PRIMARY KEY,
    company VARCHAR(10) NOT NULL,
    cust_no VARCHAR(20) NOT NULL,
    acc_type VARCHAR(10) NOT NULL,
    int_rt DECIMAL(5,2) DEFAULT 0.00,
    overdraft DECIMAL(12,2) DEFAULT 0.00,
    sort_code VARCHAR(10) NOT NULL,
    open_dd VARCHAR(2),
    open_mm VARCHAR(2),
    open_yy VARCHAR(4),
    last_stmt_dd VARCHAR(2),
    last_stmt_mm VARCHAR(2),
    last_stmt_yy VARCHAR(4),
    next_stmt_dd VARCHAR(2),
    next_stmt_mm VARCHAR(2),
    next_stmt_yy VARCHAR(4),
    avail_bal DECIMAL(15,2) DEFAULT 0.00,
    act_bal DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(cust_no) REFERENCES customers(cust_no)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company VARCHAR(10) NOT NULL,
    acc_no VARCHAR(20) NOT NULL,
    sign VARCHAR(1) NOT NULL,
    amt DECIMAL(15,2) NOT NULL,
    sort_code VARCHAR(10),
    avail_bal DECIMAL(15,2) NOT NULL,
    act_bal DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(acc_no) REFERENCES accounts(acc_no)
);

CREATE TABLE IF NOT EXISTS transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company VARCHAR(10) NOT NULL,
    from_acc_no VARCHAR(20) NOT NULL,
    to_acc_no VARCHAR(20) NOT NULL,
    from_sort_code VARCHAR(10),
    to_sort_code VARCHAR(10),
    amt DECIMAL(15,2) NOT NULL,
    from_act_bal DECIMAL(15,2),
    to_act_bal DECIMAL(15,2),
    from_avail_bal DECIMAL(15,2),
    to_avail_bal DECIMAL(15,2),
    act_sign VARCHAR(1),
    act_pnd DECIMAL(15,2) DEFAULT 0.00,
    act_pnc DECIMAL(15,2) DEFAULT 0.00,
    ava_sign VARCHAR(1),
    ava_pnd DECIMAL(15,2) DEFAULT 0.00,
    ava_pnc DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR REPLACE INTO customers (
    cust_no, company, title, first_name, initials, last_name, address_line1, address_line2, city, postcode, country, dob_dd, dob_mm, dob_yy, sort_code, credit_score, score_date_dd, score_date_mm, score_date_yy
) VALUES 
('CUST10001', 'BNK1', 'Mr', 'John', 'A', 'Smith', '122 High Street', 'Apt 4B', 'London', 'EC1A 1BB', 'United Kingdom', '15', '08', '1982', '204511', 750, '10', '01', '2023'),
('CUST10002', 'BNK1', 'Ms', 'Sarah', 'E', 'Jenkins', '45 Victoria Road', 'Suite 12', 'Manchester', 'M1 4BT', 'United Kingdom', '22', '03', '1990', '204512', 810, '15', '02', '2023');

INSERT OR REPLACE INTO accounts (
    acc_no, company, cust_no, acc_type, int_rt, overdraft, sort_code, open_dd, open_mm, open_yy, last_stmt_dd, last_stmt_mm, last_stmt_yy, next_stmt_dd, next_stmt_mm, next_stmt_yy, avail_bal, act_bal
) VALUES 
('ACC800101', 'BNK1', 'CUST10001', 'CURR', 1.25, 500.00, '204511', '01', '01', '2020', '01', '05', '2023', '01', '06', '2023', 2450.50, 2450.50),
('ACC800102', 'BNK1', 'CUST10001', 'SAVG', 3.50, 0.00, '204511', '15', '02', '2021', '01', '05', '2023', '01', '06', '2023', 12000.00, 12000.00),
('ACC800201', 'BNK1', 'CUST10002', 'CURR', 1.25, 1000.00, '204512', '10', '11', '2019', '01', '05', '2023', '01', '06', '2023', 5320.75, 5320.75);
