import type {
  ExchangeAccount,
  ExchangeAction,
  ExchangeAmount,
  ExchangeError,
} from "../interfaces";
export const SET_EXCHANGE_ACCOUNT = "SET_EXCHANGE_ACCOUNT";
export const SET_EXCHANGE_ACTION = "SET_EXCHANGE_ACTION";
export const SET_EXCHANGE_AMOUNT = "SET_EXCHANGE_AMOUNT";
export const SET_EXCHANGE_RATE = "SET_EXCHANGE_RATE";
export const SET_EXCHANGE_ERROR = "SET_EXCHANGE_ERROR";

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

export function setExchangeAmount(exchangeAmount: ExchangeAmount) {
  return {
    type: SET_EXCHANGE_AMOUNT,
    exchangeAmount,
  };
}

export function setExchangeRate(exchangeRate: number) {
  return {
    type: SET_EXCHANGE_RATE,
    exchangeRate,
  };
}

export function setExchangeError(exchangeError: ExchangeError) {
  return {
    type: SET_EXCHANGE_ERROR,
    exchangeError,
  };
}
