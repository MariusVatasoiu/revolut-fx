export interface Account {
  code: string;
  balance: number;
  label: string;
}

export interface RootState {
  accounts: { [key: string]: Account };
  exchange: {
    firstAccount: string;
    secondAccount: string;
    exchangeAction: ExchangeAction;
  };
}

export type AccountType = "firstAccount" | "secondAccount";

export interface ExchangeAccount {
  accountType: AccountType;
  accountCode: string;
}

export type ExchangeAction = "sell" | "buy";
