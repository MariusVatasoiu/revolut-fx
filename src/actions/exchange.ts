import type { Dispatch } from "redux";
import type {
  ExchangeAccount,
  ExchangeAction,
  ExchangeAmount,
  ExchangeError,
  ExchangeAmountType,
} from "../interfaces";
import { getRateAPI } from "../utils/api";
export const SET_EXCHANGE_ACCOUNT = "SET_EXCHANGE_ACCOUNT";
export const SET_EXCHANGE_ACTION = "SET_EXCHANGE_ACTION";
export const SET_EXCHANGE_AMOUNT = "SET_EXCHANGE_AMOUNT";
export const SET_EXCHANGE_RATE = "SET_EXCHANGE_RATE";
export const SET_EXCHANGE_ERROR = "SET_EXCHANGE_ERROR";
export const SET_EXCHANGE_LAST_UPDATED = "SET_EXCHANGE_LAST_UPDATED";
export const RESET_EXCHANGE_FORM = "RESET_EXCHANGE_FORM";

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

export function setExchangeLastUpdated(
  exchangeLastUpdated: ExchangeAmountType
) {
  return {
    type: SET_EXCHANGE_LAST_UPDATED,
    exchangeLastUpdated,
  };
}

export function handleExchangeRate() {
  return (dispatch: Dispatch, getState: any) => {
    const { exchange } = getState();

    const from =
      exchange.exchangeAction === "sell"
        ? exchange.firstAccount
        : exchange.secondAccount;
    const to =
      exchange.exchangeAction === "buy"
        ? exchange.firstAccount
        : exchange.secondAccount;

    return getRateAPI(from, to)
      .then((rate) => {
        dispatch(setExchangeRate(rate));
      })
      .catch((e) => {
        console.log("Something went wrong.", e);
      });
  };
}

export function setExchangeError(exchangeError: ExchangeError) {
  return {
    type: SET_EXCHANGE_ERROR,
    exchangeError,
  };
}

export function resetExchangeForm() {
  return {
    type: RESET_EXCHANGE_FORM,
  };
}
