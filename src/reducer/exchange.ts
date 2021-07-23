import {
  SET_EXCHANGE_ACCOUNT,
  SET_EXCHANGE_ACTION,
  SET_EXCHANGE_AMOUNT,
  SET_EXCHANGE_RATE,
  SET_EXCHANGE_ERROR,
  RESET_EXCHANGE_FORM,
  SET_EXCHANGE_LAST_UPDATED,
} from "../actions/exchange";
import type {
  ExchangeAccount,
  ExchangeAction,
  ExchangeAmount,
  ExchangeError,
  ExchangeAmountType,
} from "../interfaces";

interface SetExchangeAccount {
  type: string;
  exchangeAccount: ExchangeAccount;
}

interface SetExchangeAction {
  type: string;
  exchangeAction: ExchangeAction;
}

interface SetExchangeAmount {
  type: string;
  exchangeAmount: ExchangeAmount;
}

interface SetExchangeRate {
  type: string;
  exchangeRate: number;
}

interface SetExchangeLastUpdated {
  type: string;
  exchangeLastUpdated: ExchangeAmountType;
}

interface SetExchangeError {
  type: string;
  exchangeError: ExchangeError;
}

export default function exchange(
  state = {},
  action:
    | SetExchangeAccount
    | SetExchangeAction
    | SetExchangeAmount
    | SetExchangeRate
    | SetExchangeError
    | SetExchangeLastUpdated
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
    case SET_EXCHANGE_AMOUNT:
      const { amountType, amountValue } = (action as SetExchangeAmount)
        .exchangeAmount;
      const calculatedAmountType =
        amountType === "firstAmount" ? "secondAmount" : "firstAmount";
      const calculatedAmountTemp: number =
        Number(amountValue) * (state as { exchangeRate: number }).exchangeRate;
      const calculatedAmountValue = !calculatedAmountTemp
        ? ""
        : calculatedAmountTemp.toFixed(2);

      return {
        ...state,
        [amountType]: amountValue,
        [calculatedAmountType]: calculatedAmountValue,
      };
    case SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: (action as SetExchangeRate).exchangeRate,
      };
    case SET_EXCHANGE_ERROR:
      const { errorType, errorValue } = (action as SetExchangeError)
        .exchangeError;
      return {
        ...state,
        [errorType]: errorValue,
      };
    case SET_EXCHANGE_LAST_UPDATED:
      return {
        ...state,
        exchangeLastUpdated: (action as SetExchangeLastUpdated)
          .exchangeLastUpdated,
      };
    case RESET_EXCHANGE_FORM:
      return {
        ...state,
        firstAmount: "",
        secondAmount: "",
      };
    default:
      return state;
  }
}
