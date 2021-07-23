import { Component } from "react";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import AccountSelector from "./AccountSelector";
import ActionSelector from "./ActionSelector";
import Amount from "./Amount";
import type { RootState, ExchangeType } from "../interfaces";
import { setExchangeAction, setExchangeRate } from "../actions/exchange";

interface Props {
  first: string;
  second: string;
  exchange: ExchangeType;
  dispatch: Dispatch;
}

class Exchange extends Component<Props> {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(setExchangeAction("sell"));
    dispatch(setExchangeRate(2));
  }

  canContinue = () => {
    const { firstAmount, secondAmount, firstAmountError, secondAmountError } =
      this.props.exchange;

    console.log(firstAmount, secondAmount, firstAmountError, secondAmountError);

    return (
      firstAmount && secondAmount && !firstAmountError && !secondAmountError
    );
  };

  render() {
    console.log(this.props);
    const { first, second, exchange } = this.props;

    if (!first || !second) {
      return <h1>loading...</h1>;
    }

    return (
      <div>
        <h1>
          {exchange.exchangeAction} {exchange.firstAccount}
        </h1>
        <section className="container-account">
          <AccountSelector selected={first} accountType="firstAccount" />
          <Amount action={exchange.exchangeAction} amountType="firstAmount" />
        </section>
        <hr />
        <ActionSelector />
        <hr />
        <section className="container-account">
          <AccountSelector selected={second} accountType="secondAccount" />
          <Amount
            action={exchange.exchangeAction === "sell" ? "buy" : "sell"}
            amountType="secondAmount"
          />
        </section>

        <button disabled={!this.canContinue()}>
          {exchange.exchangeAction} {exchange.firstAccount} to{" "}
          {exchange.secondAccount}
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, exchange }: RootState) => {
  const [first, second] = Object.values(accounts);
  console.log("EXCHNAGE", exchange);
  return {
    first: first?.code,
    second: second?.code,
    exchange,
  };
};

export default connect(mapStateToProps)(Exchange);
