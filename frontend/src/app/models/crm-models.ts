export interface Customer {
  company: string;          // COMPANY
  custNo: string;           // CUSTNO / CUSTNO2
  title: string;            // CUSTTIT / CUSTTITL
  firstName: string;        // CHRISTN / CUSTFNAM
  middleInitial: string;    // CUSTINS
  lastName: string;         // CUSTSN / CUSTLNAM
  addressLine1: string;     // CUSTAD1
  addressLine2: string;     // CUSTAD2
  city: string;             // CITY / CUSTCITY
  postcode: string;         // POSTCODE / CUSTPOST
  country: string;          // COUNTRY / CUSTCTRY
  dateOfBirth: string;      // DOBDD/DOBMM/DOBYY formatted YYYY-MM-DD
  sortCode: string;         // SORTC
  creditScore: number;      // CREDSC
  scoreDate: string;        // SCRDTDD/SCRDTMM/SCRDTYY formatted YYYY-MM-DD
}

export interface Account {
  company: string;          // COMPANY
  accountNumber: string;    // ACCNO / ACCOUNT
  customerNumber: string;   // CUSTNO
  accountType: string;      // ACCTYP / ACTYPE (e.g. SAVINGS, CHECKING, INVESTMENT)
  interestRate: number;     // INTRT
  overdraftLimit: number;   // OVERDR
  sortCode: string;         // SRTCD / SORTC
  openDate: string;         // OPENDD/MM/YY
  lastModifiedDate: string; // LSTMDD/MM/YY
  nextStatementDate: string;// NSTMTDD/MM/YY
  availableBalance: number; // AVAIL / AVBAL
  actualBalance: number;    // ACTBAL
}

export interface DepositWithdrawRequest {
  company: string;          // COMPANY
  accountNumber: string;    // ACCNO
  sortCode: string;         // SORTC
  sign: '+' | '-';          // SIGN (+ for deposit, - for withdrawal)
  amount: number;           // AMT
}

export interface TransferRequest {
  company: string;          // COMPANY
  fromAccountNumber: string;// FACCNO
  fromSortCode: string;     // FSORTC
  fromSubCodes: string[];   // FSCDE1, FSCDE2, FSCDE3
  toAccountNumber: string;  // TACCNO
  toSortCode: string;       // TSORTC
  toSubCodes: string[];     // TSCDE1, TSCDE2, TSCDE3
  amount: number;           // AMT
}

export interface CRMOperationResult {
  success: boolean;
  message: string;          // MESSAGE field from BMS
  updatedAccount?: Account;
  transactionId?: string;
  timestamp: string;
}