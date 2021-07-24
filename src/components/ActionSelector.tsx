import { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { RootState, ExchangeAction } from "../interfaces";
import { setExchangeAction, handleExchangeRate } from "../actions/exchange";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { ThunkDispatch } from "redux-thunk";

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  exchangeAction: ExchangeAction;
}

export class ActionSelector extends Component<Props> {
  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const { dispatch, exchangeAction } = this.props;

    dispatch(setExchangeAction(exchangeAction === "sell" ? "buy" : "sell"));
    dispatch(handleExchangeRate());
  };

  render() {
    const { exchangeAction } = this.props;

    return (
      <button
        className="action-btn"
        onClick={this.handleClick}
        data-testid="action-btn"
      >
        {exchangeAction === "sell" && <FaArrowDown data-testid="arrow-down" />}
        {exchangeAction === "buy" && <FaArrowUp data-testid="arrow-up" />}
      </button>
    );
  }
}

const mapStateToProps = ({ exchange }: RootState) => {
  return {
    exchangeAction: exchange.exchangeAction as ExchangeAction,
  };
};

export default connect(mapStateToProps)(ActionSelector);
