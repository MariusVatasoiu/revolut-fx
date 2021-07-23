import { RECEIVE_ACCOUNTS, UPDATE_ACCOUNT_AMOUNT } from "../actions/accounts";
import type { UpdateAccountAmount, AccountsState } from "../interfaces";

interface ReceiveAccountsAction {
  type: string;
  accounts: {};
}

interface UpdateAmountAction {
  type: string;
  updateAmount: UpdateAccountAmount;
}

export default function accounts(
  state = {},
  action: ReceiveAccountsAction | UpdateAmountAction
) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
        ...(action as ReceiveAccountsAction).accounts,
      };
    case UPDATE_ACCOUNT_AMOUNT:
      const { account, amount, exchangeAction } = (action as UpdateAmountAction)
        .updateAmount;
      const balance =
        exchangeAction === "sell"
          ? (state as AccountsState)[account].balance - amount
          : (state as AccountsState)[account].balance + amount;
      return {
        ...state,
        [account]: {
          ...(state as AccountsState)[account],
          balance,
        },
      };
    default:
      return state;
  }
}
