import { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { setExchangeAmount, setExchangeError } from "../actions/exchange";
import type { Dispatch } from "redux";
import type {
  Account,
  ExchangeAmountType,
  RootState,
  ExchangeType,
} from "../interfaces";

interface Props {
  account: Account;
  action: string;
  amountType: ExchangeAmountType;
  exchange: ExchangeType;
  dispatch: Dispatch;
}

interface State {
  value: string;
}

class Amount extends Component<Props> {
  state = { value: "", hasError: false };

  componentDidUpdate(prevProps: Props) {
    const { value } = this.state;
    const { amountType } = this.props;

    if (this.props.action !== prevProps.action) {
      this.setState((state: State) => ({
        value: this.formatAmount(state.value),
      }));

      this.validateAmount(this.getNumericAmount(value));
    }

    if (this.props.exchange[amountType] !== prevProps.exchange[amountType]) {
      this.setState((state: State) => ({
        value: this.formatAmount(this.props.exchange[amountType]),
      }));

      this.validateAmount(this.getNumericAmount(value));
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { amountType, dispatch } = this.props;
    const value = event.target.value;

    this.validateAmount(this.getNumericAmount(value));

    dispatch(
      setExchangeAmount({
        amountType,
        amountValue: this.getNumericAmount(value),
      })
    );

    this.setState({ value: this.formatAmount(value) });
  };

  validateAmount = (amount: string) => {
    const { account, amountType, exchange, dispatch } = this.props;

    if (
      (amountType === "firstAmount" && exchange.exchangeAction === "sell") ||
      (amountType === "secondAmount" && exchange.exchangeAction === "buy")
    ) {
      //check balance
      if (Number(amount) > account.balance) {
        this.setState({ hasError: true });
        dispatch(
          setExchangeError({
            errorType: `${amountType}Error`,
            errorValue: true,
          })
        );
        return;
      }
    }

    this.setState({ hasError: false });
    dispatch(
      setExchangeError({
        errorType: `${amountType}Error`,
        errorValue: false,
      })
    );
  };

  formatAmount = (value: string = "") => {
    const { action } = this.props;
    const sign = action === "sell" ? "-" : "+";

    const numericAmount = this.getNumericAmount(value);

    const valueFormatted =
      numericAmount === "" ? `${numericAmount}` : `${sign} ${numericAmount}`;

    return valueFormatted;
  };

  getNumericAmount = (amount: string) => {
    let numericAmount = amount;
    if (amount.startsWith("- ") || amount.startsWith("+ ")) {
      numericAmount = amount.substring(2);
    }
    return numericAmount;
  };

  render() {
    const { value, hasError } = this.state;
    return (
      <div style={{ display: "inline-block", backgroundColor: "#c7eac7" }}>
        <input
          type="text"
          className="amount-input"
          value={value}
          onChange={this.handleChange}
          placeholder="0"
        />
        {hasError && <p className="error">exceed balance</p>}
      </div>
    );
  }
}

const mapStateToProps = (
  { accounts, exchange }: RootState,
  { amountType }: { amountType: ExchangeAmountType }
) => {
  const accountType =
    amountType === "firstAmount" ? "firstAccount" : "secondAccount";
  return {
    exchange,
    account: accounts[exchange[accountType]],
  };
};

export default connect(mapStateToProps)(Amount);
