import { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { RootState, ExchangeAction } from "../interfaces";
import { setExchangeAction, handleExchangeRate } from "../actions/exchange";
import type { ThunkDispatch } from "redux-thunk";

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  exchangeAction: ExchangeAction;
}

class ActionSelector extends Component<Props> {
  handleClick = (event: MouseEvent) => {
    event.preventDefault();

    const { dispatch, exchangeAction } = this.props;
    dispatch(setExchangeAction(exchangeAction === "sell" ? "buy" : "sell"));
    dispatch(handleExchangeRate());
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
