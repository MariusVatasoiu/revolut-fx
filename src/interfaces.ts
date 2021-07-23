export interface Account {
  code: string;
  balance: number;
  label: string;
}

export interface RootState {
  accounts: { [key: string]: Account };
  exchange: ExchangeType;
}

export type AccountType = "firstAccount" | "secondAccount";

export interface ExchangeAccount {
  accountType: AccountType;
  accountCode: string;
}

export type ExchangeAction = "sell" | "buy";

export interface ExchangeType {
  firstAccount: string;
  firstAmount: ExchangeAmountType;
  firstAmountError: boolean;
  secondAccount: string;
  secondAmount: ExchangeAmountType;
  secondAmountError: boolean;
  exchangeAction: ExchangeAction;
  exchangeRate: number;
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
