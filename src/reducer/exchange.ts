import { SET_EXCHANGE_ACCOUNT, SET_EXCHANGE_ACTION } from "../actions/exchange";
import type { ExchangeAccount, ExchangeAction } from "../interfaces";

interface SetExchangeAccount {
  type: string;
  exchangeAccount: ExchangeAccount;
}

interface SetExchangeAction {
  type: string;
  exchangeAction: ExchangeAction;
}

export default function exchange(
  state = {},
  action: SetExchangeAccount | SetExchangeAction
) {
  switch (action.type) {
    case SET_EXCHANGE_ACCOUNT:
      const { accountCode, accountType } = (action as SetExchangeAccount)
        .exchangeAccount;
      return {
        ...state,
        [accountType]: accountCode,
      };
    case SET_EXCHANGE_ACTION:
      return {
        ...state,
        exchangeAction: (action as SetExchangeAction).exchangeAction,
      };
    default:
      return state;
  }
}
