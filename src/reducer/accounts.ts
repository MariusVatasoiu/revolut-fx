import { RECEIVE_ACCOUNTS } from "../actions/accounts";

interface Action {
  type: string;
  accounts: {};
}

export default function accounts(state = {}, action: Action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
        ...action.accounts,
      };
    default:
      return state;
  }
}
