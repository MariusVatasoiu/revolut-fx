import { Component } from "react";
import { connect } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";

import Exchange from "./Exchange";
import { handleInitialData } from "../actions/shared";
import logo from "../assets/logo.png";

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
}

class App extends Component<Props> {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="app">
        <header>
          <img src={logo} alt="Revolut" />
        </header>
        <Exchange />
      </div>
    );
  }
}

export default connect()(App);
