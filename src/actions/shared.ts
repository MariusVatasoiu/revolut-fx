import { Dispatch } from "redux";
import { getAccountsAPI } from "../utils/api";
import { receiveAccounts } from "./accounts";

export function handleInitialData() {
  return (dispatch: Dispatch) => {
    return getAccountsAPI().then((accounts) =>
      dispatch(receiveAccounts(accounts))
    );
  };
}
