export interface Account {
  code: string;
  balance: number;
  label: string;
  symbol: string;
}

export interface AccountsState {
  [key: string]: Account;
}

export interface RootState {
  accounts: AccountsState;
  exchange: ExchangeState;
}

export type AccountType = "firstAccount" | "secondAccount";

export interface ExchangeAccount {
  accountType: AccountType;
  accountCode: string;
}

export type ExchangeAction = "sell" | "buy";

export interface ExchangeState {
  firstAccount: string;
  firstAmount: ExchangeAmountType;
  firstAmountError: boolean;
  secondAccount: string;
  secondAmount: ExchangeAmountType;
  secondAmountError: boolean;
  exchangeAction: ExchangeAction;
  exchangeRate: number;
  exchangeLastUpdated: ExchangeAmountType;
}

export interface ExchangeAmount {
  amountType: ExchangeAmountType;
  amountValue: string;
}

export type ExchangeAmountType = "firstAmount" | "secondAmount";

export type ExchangeErrorType = "firstAmountError" | "secondAmountError";

export interface ExchangeError {
  errorType: ExchangeErrorType;
  errorValue: boolean;
}

export interface UpdateAccountAmount {
  account: string;
  amount: number;
  exchangeAction: "sell" | "buy";
}
