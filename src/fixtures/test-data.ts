export interface CustomerData {
  company: string;
  title: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  country: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  sortCode: string;
  custNo: string;
  creditScore: string;
  scoreDateDay: string;
  scoreDateMonth: string;
  scoreDateYear: string;
}

export interface AccountData {
  company: string;
  custNo: string;
  accountType: string;
  interestRate: string;
  overdraftLimit: string;
  accNo: string;
  sortCode: string;
  openDay: string;
  openMonth: string;
  openYear: string;
  lastStmtDay: string;
  lastStmtMonth: string;
  lastStmtYear: string;
  nextStmtDay: string;
  nextStmtMonth: string;
  nextStmtYear: string;
  availableBalance: string;
  actualBalance: string;
}

export interface CashDepositData {
  company: string;
  accNo: string;
  sign: '+' | '-';
  amount: string;
  sortCode: string;
  availableBalance: string;
  actualBalance: string;
}

export interface DirectTransferData {
  company: string;
  fromAccNo: string;
  toAccNo: string;
  amount: string;
  fromSortCode: string;
  toSortCode: string;
  fromActualBal?: string;
  toActualBal?: string;
  fromAvailBal?: string;
  toAvailBal?: string;
}

export interface BankToBankTransferData {
  company: string;
  fromSortCode1: string;
  fromSortCode2: string;
  fromSortCode3: string;
  fromAccNo: string;
  amount: string;
  actSign: string;
  actPending: string;
  actPnc: string;
  availSign: string;
  availPending: string;
  availPnc: string;
  toSortCode1: string;
  toSortCode2: string;
  toSortCode3: string;
  toAccNo: string;
}

export const TEST_CUSTOMER: CustomerData = {
  company: 'GLOBAL_BANK',
  title: 'MR',
  firstName: 'JOHN',
  middleInitial: 'A',
  lastName: 'DOE',
  addressLine1: '100 FINANCIAL WAY',
  addressLine2: 'SUITE 400',
  city: 'LONDON',
  postcode: 'EC1A 1BB',
  country: 'UNITED KINGDOM',
  dobDay: '15',
  dobMonth: '08',
  dobYear: '1985',
  sortCode: '102030',
  custNo: '98765432',
  creditScore: '750',
  scoreDateDay: '01',
  scoreDateMonth: '01',
  scoreDateYear: '2024'
};

export const TEST_ACCOUNT: AccountData = {
  company: 'GLOBAL_BANK',
  custNo: '98765432',
  accountType: 'SAVINGS',
  interestRate: '2.50',
  overdraftLimit: '500.00',
  accNo: '11223344',
  sortCode: '102030',
  openDay: '10',
  openMonth: '02',
  openYear: '2022',
  lastStmtDay: '01',
  lastStmtMonth: '05',
  lastStmtYear: '2024',
  nextStmtDay: '01',
  nextStmtMonth: '06',
  nextStmtYear: '2024',
  availableBalance: '2500.00',
  actualBalance: '2500.00'
};

export const TEST_DEPOSIT: CashDepositData = {
  company: 'GLOBAL_BANK',
  accNo: '11223344',
  sign: '+',
  amount: '350.00',
  sortCode: '102030',
  availableBalance: '2850.00',
  actualBalance: '2850.00'
};

export const TEST_TRANSFER: DirectTransferData = {
  company: 'GLOBAL_BANK',
  fromAccNo: '11223344',
  toAccNo: '55667788',
  amount: '150.00',
  fromSortCode: '102030',
  toSortCode: '102030',
  fromActualBal: '2350.00',
  toActualBal: '1150.00',
  fromAvailBal: '2350.00',
  toAvailBal: '1150.00'
};

export const TEST_B2M_TRANSFER: BankToBankTransferData = {
  company: 'GLOBAL_BANK',
  fromSortCode1: '10',
  fromSortCode2: '20',
  fromSortCode3: '30',
  fromAccNo: '11223344',
  amount: '500.00',
  actSign: '+',
  actPending: '0.00',
  actPnc: '0.00',
  availSign: '+',
  availPending: '0.00',
  availPnc: '0.00',
  toSortCode1: '40',
  toSortCode2: '50',
  toSortCode3: '60',
  toAccNo: '99887766'
};