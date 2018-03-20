import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./BaseContent.css";
import sendGrid from "../actions/sendgrid.js";
import thunk from "redux-thunk";

class BaseContent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button
          onClick={() => {
            this.props.dispatch(sendGrid());
          }}
        >
          Clicky
        </button>
        <p className="App-intro">
          <h3>I'M YELLING THIS</h3>
          <h3>I'M YELLING THIS</h3>
          <h3>I'M YELLING THIS</h3>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    campaigns: state.campaigns
  };
}

export default connect(mapStateToProps)(BaseContent);
