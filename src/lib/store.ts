"use client";

import { Customer, Account } from './types';

const INITIAL_CUSTOMERS: Customer[] = [
  {
    company: 'MOD-CORP-01',
    custNo: 'CUST-10001',
    custTit: 'Mr.',
    christn: 'Alexander',
    custIns: 'A',
    custSn: 'Hamilton',
    custAd1: '74 Wall Street',
    custAd2: 'Suite 400',
    city: 'New York',
    postcode: '10005',
    country: 'USA',
    dobDD: '11',
    dobMM: '01',
    dobYY: '1757',
    sortCode: '10-20-30',
    credSc: '785',
    scrdtDD: '15',
    scrdtMM: '01',
    scrdtYY: '2024',
    status: 'ACTIVE',
    lastMessage: 'BNK1CCM - CUSTOMER MASTER RECORD LOADED OK'
  },
  {
    company: 'MOD-CORP-01',
    custNo: 'CUST-10002',
    custTit: 'Ms.',
    christn: 'Eleanor',
    custIns: 'R',
    custSn: 'Vance',
    custAd1: '12 Hill House Lane',
    custAd2: 'Apt 2B',
    city: 'Boston',
    postcode: '02108',
    country: 'USA',
    dobDD: '24',
    dobMM: '08',
    dobYY: '1985',
    sortCode: '10-20-30',
    credSc: '720',
    scrdtDD: '10',
    scrdtMM: '02',
    scrdtYY: '2024',
    status: 'ACTIVE',
    lastMessage: 'BNK1CCM - CUSTOMER MASTER RECORD LOADED OK'
  }
];

const INITIAL_ACCOUNTS: Account[] = [
  {
    company: 'MOD-CORP-01',
    custNo: 'CUST-10001',
    accNo: 'ACC-88001',
    accTyp: 'CHECKING',
    intRt: 1.25,
    overdr: 500.00,
    srtCd: '10-20-30',
    openDD: '01',
    openMM: '03',
    openYY: '2020',
    lstmDD: '28',
    lstmMM: '01',
    lstmYY: '2024',
    nstmtDD: '28',
    nstmtMM: '02',
    nstmtYY: '2024',
    avail: 12450.75,
    actBal: 12950.75,
    status: 'ACTIVE',
    lastMessage: 'BNK1CAM - ACCOUNT RETRIEVED SUCCESSFULLY'
  },
  {
    company: 'MOD-CORP-01',
    custNo: 'CUST-10001',
    accNo: 'ACC-88002',
    accTyp: 'SAVINGS',
    intRt: 4.50,
    overdr: 0.00,
    srtCd: '10-20-30',
    openDD: '15',
    openMM: '06',
    openYY: '2021',
    lstmDD: '28',
    lstmMM: '01',
    lstmYY: '2024',
    nstmtDD: '28',
    nstmtMM: '02',
    nstmtYY: '2024',
    avail: 45000.00,
    actBal: 45000.00,
    status: 'ACTIVE',
    lastMessage: 'BNK1CAM - ACCOUNT RETRIEVED SUCCESSFULLY'
  },
  {
    company: 'MOD-CORP-01',
    custNo: 'CUST-10002',
    accNo: 'ACC-88003',
    accTyp: 'CHECKING',
    intRt: 0.75,
    overdr: 200.00,
    srtCd: '10-20-30',
    openDD: '10',
    openMM: '11',
    openYY: '2022',
    lstmDD: '28',
    lstmMM: '01',
    lstmYY: '2024',
    nstmtDD: '28',
    nstmtMM: '02',
    nstmtYY: '2024',
    avail: 3100.50,
    actBal: 3300.50,
    status: 'ACTIVE',
    lastMessage: 'BNK1CAM - ACCOUNT RETRIEVED SUCCESSFULLY'
  }
];

export function getStoredCustomers(): Customer[] {
  if (typeof window === 'undefined') return INITIAL_CUSTOMERS;
  const data = localStorage.getItem('modernized_customers');
  if (!data) {
    localStorage.setItem('modernized_customers', JSON.stringify(INITIAL_CUSTOMERS));
    return INITIAL_CUSTOMERS;
  }
  return JSON.parse(data);
}

export function saveCustomers(customers: Customer[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('modernized_customers', JSON.stringify(customers));
  }
}

export function getStoredAccounts(): Account[] {
  if (typeof window === 'undefined') return INITIAL_ACCOUNTS;
  const data = localStorage.getItem('modernized_accounts');
  if (!data) {
    localStorage.setItem('modernized_accounts', JSON.stringify(INITIAL_ACCOUNTS));
    return INITIAL_ACCOUNTS;
  }
  return JSON.parse(data);
}

export function saveAccounts(accounts: Account[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('modernized_accounts', JSON.stringify(accounts));
  }
}
