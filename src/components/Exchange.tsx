import { Component } from "react";
import type { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import AccountSelector from "./AccountSelector";
import ActionSelector from "./ActionSelector";
import Amount from "./Amount";
import type { RootState, ExchangeType } from "../interfaces";
import { setExchangeAction, handleExchangeRate } from "../actions/exchange";
import { titleCase } from "../utils/helpers";

interface Props {
  first: string;
  second: string;
  exchange: ExchangeType;
  dispatch: ThunkDispatch<any, any, any>;
}

class Exchange extends Component<Props> {
  state = { timer: undefined };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(setExchangeAction("sell"));

    // const timer = setInterval(() => {
    //   dispatch(handleExchangeRate());
    // }, 1000000); // should be 10000, but I increased it to save reqs from free account
    // this.setState({ timer });
  }

  componentWillUnmount() {
    const { timer } = this.state;

    if (timer) {
      clearInterval(timer);
    }
  }

  canContinue = () => {
    const { firstAmount, secondAmount, firstAmountError, secondAmountError } =
      this.props.exchange;

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
          {titleCase(exchange.exchangeAction)} {exchange.firstAccount}
        </h1>
        <p>
          1 {exchange.firstAccount} = {exchange.exchangeRate}{" "}
          {exchange.secondAccount}
        </p>
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
          {titleCase(exchange.exchangeAction)} {exchange.firstAccount}
          {exchange.exchangeAction === "sell" ? " to " : " with "}
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
