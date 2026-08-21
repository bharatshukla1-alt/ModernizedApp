export interface Customer {
  id: number;
  company: string;
  custNo: string;
  title: string;
  firstName: string;
  initials: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  dateOfBirth: string;
  sortCode: string;
  creditScore: number;
  scoreDate: string;
}

export interface Account {
  id: number;
  company: string;
  custNo: string;
  accNo: string;
  accType: string;
  interestRate: number;
  overdraftLimit: number;
  sortCode: string;
  openDate: string;
  lastStatementDate: string;
  nextStatementDate: string;
  availableBalance: number;
  actualBalance: number;
}

export interface Transaction {
  id: number;
  company: string;
  transactionType: string;
  fromAccNo: string;
  toAccNo: string;
  amount: number;
  sign: string;
  fromSortCode: string;
  toSortCode: string;
  fromActualBalance: number;
  toActualBalance: number;
  fromAvailableBalance: number;
  toAvailableBalance: number;
  timestamp: string;
  message: string;
}

export interface CreateCustomerDto {
  company: string;
  custNo: string;
  title: string;
  firstName: string;
  initials: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  dateOfBirth: string;
  sortCode: string;
  creditScore: number;
}

export interface CreateAccountDto {
  company: string;
  custNo: string;
  accNo: string;
  accType: string;
  interestRate: number;
  overdraftLimit: number;
  sortCode: string;
  initialDeposit: number;
}

export interface TransferDto {
  company: string;
  fromAccNo: string;
  toAccNo: string;
  amount: number;
  fromSortCode: string;
  toSortCode: string;
}

export interface DepositWithdrawDto {
  company: string;
  accNo: string;
  sign: string;
  amount: number;
  sortCode: string;
}