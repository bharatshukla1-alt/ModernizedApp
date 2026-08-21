export interface Customer {
  company: string;          // COMPANY
  custNo: string;           // CUSTNO / CUSTNO2
  custTit: string;          // CUSTTIT / CUSTTITL
  christn: string;          // CHRISTN / CUSTFNAM
  custIns: string;          // CUSTINS
  custSn: string;           // CUSTSN / CUSTLNAM
  custAd1: string;          // CUSTAD1
  custAd2: string;          // CUSTAD2
  city: string;             // CITY / CUSTCITY
  postcode: string;         // POSTCODE / CUSTPOST
  country: string;          // COUNTRY / CUSTCTRY
  dobDD: string;            // DOBDD
  dobMM: string;            // DOBMM
  dobYY: string;            // DOBYY
  sortCode: string;         // SORTC
  credSc: string;           // CREDSC
  scrdtDD: string;          // SCRDTDD
  scrdtMM: string;          // SCRDTMM
  scrdtYY: string;          // SCRDTYY
  status: 'ACTIVE' | 'INACTIVE';
  lastMessage?: string;     // MESSAGE
}

export interface Account {
  company: string;          // COMPANY
  custNo: string;           // CUSTNO
  accNo: string;            // ACCNO / ACCOUNT / FACCNO / TACCNO
  accTyp: string;           // ACCTYP / ACTYPE (e.g. SAVINGS, CHECKING, LOAN)
  intRt: number;            // INTRT
  overdr: number;           // OVERDR
  srtCd: string;            // SRTCD / SORTC
  openDD: string;           // OPENDD
  openMM: string;           // OPENMM
  openYY: string;           // OPENYY
  lstmDD: string;           // LSTMDD / LSTMTDD
  lstmMM: string;           // LSTMMM / LSTMTMM
  lstmYY: string;           // LSTMYY / LSTMTYY
  nstmtDD: string;          // NSTMTDD
  nstmtMM: string;          // NSTMTMM
  nstmtYY: string;          // NSTMTYY
  avail: number;            // AVAIL / AVBAL
  actBal: number;           // ACTBAL
  status: 'ACTIVE' | 'CLOSED';
  lastMessage?: string;     // MESSAGE
}

export interface DepositWithdrawReq {
  company: string;          // COMPANY
  accNo: string;            // ACCNO
  sign: '+' | '-';          // SIGN
  amt: number;              // AMT
  sortCode: string;         // SORTC
}

export interface TransferReq {
  company: string;          // COMPANY
  fAccNo: string;           // FACCNO
  tAccNo: string;           // TACCNO
  amt: number;              // AMT
  fSortC: string;           // FSORTC
  tSortC: string;           // TSORTC
}

export interface BatchAdjustmentReq {
  company: string;          // COMPANY
  fscde1: string;           // FSCDE1
  fscde2: string;           // FSCDE2
  fscde3: string;           // FSCDE3
  fAccNo: string;           // FACCNO
  amt: number;              // AMT
  actSign: '+' | '-';       // ACTSIGN
  actPnd: number;           // ACTPND
  actPnc: number;           // ACTPNC
  avaSign: '+' | '-';       // AVASIGN
  avaPnd: number;           // AVAPND
  avaPnc: number;           // AVAPNC
  tscde1: string;           // TSCDE1
  tscde2: string;           // TSCDE2
  tscde3: string;           // TSCDE3
  tAccNo: string;           // TACCNO
}

export interface LegacyBmsRef {
  mapset: string;
  description: string;
  fields: string[];
}
