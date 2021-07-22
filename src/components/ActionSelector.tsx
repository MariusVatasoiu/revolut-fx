import { Component, MouseEvent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState, ExchangeAction } from "../interfaces";
import { setExchangeAction } from "../actions/exchange";

interface Props {
  dispatch: Dispatch;
  exchangeAction: ExchangeAction;
}

class ActionSelector extends Component<Props> {
  handleClick = (event: MouseEvent) => {
    event.preventDefault();

    const { dispatch, exchangeAction } = this.props;
    dispatch(setExchangeAction(exchangeAction === "sell" ? "buy" : "sell"));
  };

  render() {
    const { exchangeAction } = this.props;

    return <button onClick={this.handleClick}>{exchangeAction}</button>;
  }
}

const mapStateToProps = ({ exchange }: RootState) => {
  return {
    exchangeAction: exchange.exchangeAction as ExchangeAction,
  };
};

export default connect(mapStateToProps)(ActionSelector);
