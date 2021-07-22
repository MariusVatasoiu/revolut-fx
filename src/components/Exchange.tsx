import { Component } from "react";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import AccountSelector from "./AccountSelector";
import ActionSelector from "./ActionSelector";
import type { RootState } from "../interfaces";
import { setExchangeAccount, setExchangeAction } from "../actions/exchange";

interface Props {
  first: string;
  second: string;
  exchangeAction: string;
  dispatch: Dispatch;
}

class Exchange extends Component<Props> {
  componentDidMount() {
    const { first, second, dispatch } = this.props;
    if (first) {
      dispatch(
        setExchangeAccount({ accountType: "firstAccount", accountCode: first })
      );
    }

    if (second) {
      dispatch(
        setExchangeAccount({
          accountType: "secondAccount",
          accountCode: second,
        })
      );
    }

    dispatch(setExchangeAction("sell"));
  }

  render() {
    console.log(this.props);
    const { first, second, exchangeAction } = this.props;

    if (!first || !second) {
      return <h1>Not ready</h1>;
    }

    return (
      <div>
        <h1>{exchangeAction} </h1>
        <section style={{ border: "1px solid red" }}>
          <AccountSelector selected={first} accountType="firstAccount" />
          <input type="text" />
        </section>
        <hr />
        <ActionSelector />
        <hr />
        <section style={{ border: "1px solid red" }}>
          <AccountSelector selected={second} accountType="secondAccount" />
          <input type="text" />
        </section>

        <button>Sell</button>
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, exchange }: RootState) => {
  const [first, second] = Object.values(accounts);
  console.log("EXCHNAGE", accounts);
  return {
    title: `${exchange.exchangeAction} ${exchange.firstAccount}`,
    first: first?.code,
    second: second?.code,
    exchangeAction: exchange.exchangeAction,
  };
};

export default connect(mapStateToProps)(Exchange);
