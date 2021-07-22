import { combineReducers } from "redux";
import accounts from "./accounts";
import exchange from "./exchange";

export default combineReducers({
  accounts,
  exchange,
});
