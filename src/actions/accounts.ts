import type { UpdateAccountAmount } from "../interfaces";

export const RECEIVE_ACCOUNTS = "RECEIVE_ACCOUNTS";
export const UPDATE_ACCOUNT_AMOUNT = "UPDATE_ACCOUNT_AMOUNT";

export function receiveAccounts(accounts: {}) {
  return {
    type: RECEIVE_ACCOUNTS,
    accounts,
  };
}

export function updateAccountAmount(updateAmount: UpdateAccountAmount) {
  return {
    type: UPDATE_ACCOUNT_AMOUNT,
    updateAmount,
  };
}
