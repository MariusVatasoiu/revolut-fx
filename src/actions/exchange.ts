import type { ExchangeAccount, ExchangeAction } from "../interfaces";
export const SET_EXCHANGE_ACCOUNT = "SET_EXCHANGE_ACCOUNT";
export const SET_EXCHANGE_ACTION = "SET_EXCHANGE_ACTION";

/***
 * {exchange: {firstAccount, secondAccount, exchangeAction }}
 */

export function setExchangeAccount(exchangeAccount: ExchangeAccount) {
  return {
    type: SET_EXCHANGE_ACCOUNT,
    exchangeAccount,
  };
}

export function setExchangeAction(exchangeAction: ExchangeAction) {
  return {
    type: SET_EXCHANGE_ACTION,
    exchangeAction,
  };
}
