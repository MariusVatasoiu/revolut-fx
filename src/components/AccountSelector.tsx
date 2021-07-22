import { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setExchangeAccount } from "../actions/exchange";
import type { Account, RootState, AccountType } from "../interfaces";

interface Props {
  initialAccount: Account;
  selectedAccount: Account;
  accounts: { [key: string]: Account };
  accountType: "firstAccount" | "secondAccount";
  dispatch: Dispatch;
}

class AccountSelector extends Component<Props> {
  state = { value: this.props.initialAccount.code };

  handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ value: event.target.value });

    this.props.dispatch(
      setExchangeAccount({
        accountType: this.props.accountType,
        accountCode: event.target.value,
      })
    );
  };

  render() {
    const { accounts, initialAccount, selectedAccount } = this.props;
    const { value } = this.state;

    console.log(accounts, initialAccount);

    return (
      <div style={{ backgroundColor: "#ffcfcf" }}>
        <select value={value} onChange={this.handleChange}>
          {Object.values(accounts).map((account: Account) => (
            <option key={account.code} value={account.code}>
              {account.label} - {account.balance}
            </option>
          ))}
        </select>
        <p>Balance: {selectedAccount?.balance || initialAccount?.balance}</p>
      </div>
    );
  }
}

const mapStateToProps = (
  { accounts, exchange }: RootState,
  { selected, accountType }: { selected: string; accountType: AccountType }
) => {
  console.log("SELECTED", selected);
  return {
    accounts,
    initialAccount: accounts[selected],
    selectedAccount: accounts[exchange[accountType]],
  };
};

export default connect(mapStateToProps)(AccountSelector);
