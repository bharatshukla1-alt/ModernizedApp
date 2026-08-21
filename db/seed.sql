CREATE TABLE IF NOT EXISTS customers (
    custno TEXT PRIMARY KEY,
    company TEXT NOT NULL DEFAULT 'BNK1',
    title TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    initials TEXT,
    address1 TEXT,
    address2 TEXT,
    city TEXT,
    postcode TEXT,
    country TEXT,
    dob TEXT,
    sort_code TEXT,
    credit_score INTEGER,
    score_date TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
    accno TEXT PRIMARY KEY,
    company TEXT NOT NULL DEFAULT 'BNK1',
    custno TEXT NOT NULL,
    acctype TEXT NOT NULL,
    intrt REAL DEFAULT 0.0,
    overdraft REAL DEFAULT 0.0,
    sort_code TEXT NOT NULL,
    open_date TEXT,
    last_stmt_date TEXT,
    next_stmt_date TEXT,
    avail_balance REAL DEFAULT 0.0,
    act_balance REAL DEFAULT 0.0,
    FOREIGN KEY(custno) REFERENCES customers(custno)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT DEFAULT 'BNK1',
    from_accno TEXT,
    to_accno TEXT,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    sign TEXT DEFAULT '+',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'SUCCESS',
    message TEXT
);

INSERT OR IGNORE INTO customers (custno, company, title, first_name, last_name, initials, address1, address2, city, postcode, country, dob, sort_code, credit_score, score_date)
VALUES 
('CST10001', 'BNK1', 'MR', 'JOHN', 'SMITH', 'J', '10 DOWNING ST', 'WESTMINSTER', 'LONDON', 'SW1A 1AA', 'UK', '1980-05-15', '200000', 750, '2023-01-10'),
('CST10002', 'BNK1', 'MS', 'SARAH', 'CONNOR', 'J', '42 WALLABY WAY', 'SYDNEY', 'LONDON', 'EC1A 1BB', 'UK', '1985-11-22', '200000', 820, '2023-02-14');

INSERT OR IGNORE INTO accounts (accno, company, custno, acctype, intrt, overdraft, sort_code, open_date, last_stmt_date, next_stmt_date, avail_balance, act_balance)
VALUES
('ACC80001', 'BNK1', 'CST10001', 'CURR', 1.5, 500.0, '200000', '2020-01-01', '2023-05-01', '2023-06-01', 1500.00, 1500.00),
('ACC80002', 'BNK1', 'CST10001', 'SAVG', 3.5, 0.0, '200000', '2021-03-15', '2023-05-01', '2023-06-01', 5000.00, 5000.00),
('ACC80003', 'BNK1', 'CST10002', 'CURR', 1.5, 1000.0, '200000', '2019-11-20', '2023-05-01', '2023-06-01', 2300.50, 2300.50);

INSERT OR IGNORE INTO transactions (id, company, from_accno, to_accno, type, amount, sign, status, message)
VALUES
(1, 'BNK1', 'ACC80001', 'ACC80002', 'TRANSFER', 500.00, '-', 'SUCCESS', 'INITIAL SAVINGS TRANSFER'),
(2, 'BNK1', 'ACC80003', 'ACC80003', 'DEPOSIT', 200.00, '+', 'SUCCESS', 'CASH DEPOSIT');