import { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import {
  setExchangeAccount,
  resetExchangeForm,
  handleExchangeRate,
} from "../actions/exchange";
import type { ThunkDispatch } from "redux-thunk";
import type { Account, RootState, AccountType } from "../interfaces";

interface Props {
  initialAccount: Account;
  selectedAccount: Account;
  accounts: { [key: string]: Account };
  accountType: "firstAccount" | "secondAccount";
  dispatch: ThunkDispatch<any, any, any>;
}

export class AccountSelector extends Component<Props> {
  state = { value: this.props.initialAccount?.code };

  handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { dispatch } = this.props;
    this.setState({ value: event.target.value });

    dispatch(
      setExchangeAccount({
        accountType: this.props.accountType,
        accountCode: event.target.value,
      })
    );

    dispatch(resetExchangeForm());

    dispatch(handleExchangeRate());
  };

  componentDidMount() {
    const { value } = this.state;
    const { accountType, dispatch } = this.props;

    dispatch(setExchangeAccount({ accountType, accountCode: value }));
  }

  render() {
    const { accounts, initialAccount, selectedAccount } = this.props;
    const { value } = this.state;

    return (
      <div style={{ backgroundColor: "#ffcfcf", display: "inline-block" }}>
        <select
          value={value}
          onChange={this.handleChange}
          data-testid="account-selector"
        >
          {Object.values(accounts).map((account: Account) => (
            <option key={account.code} value={account.code}>
              {account.label} - {account.balance}
            </option>
          ))}
        </select>
        <p>
          Balance: {selectedAccount?.symbol || initialAccount?.symbol}
          {selectedAccount?.balance || initialAccount?.balance}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (
  { accounts, exchange }: RootState,
  { selected, accountType }: { selected: string; accountType: AccountType }
) => {
  return {
    accounts,
    initialAccount: accounts[selected],
    selectedAccount: accounts[exchange[accountType]],
  };
};

export default connect(mapStateToProps)(AccountSelector);
