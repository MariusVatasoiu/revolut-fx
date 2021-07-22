import { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import "./App.css";
import Exchange from "./components/Exchange";
import { handleInitialData } from "./actions/shared";

// const API_KEY = "f09c043971970998988b752b";
// fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`, {
//   // mode: "no-cors",
// })
//   .then((response) => response.json())
//   .then((res) => console.log(res));

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
        <header>Revolut</header>
        <Exchange />
      </div>
    );
  }
}

export default connect()(App);
