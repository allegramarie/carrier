import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./BaseContent.css";
import thunk from "redux-thunk";
import axios from "axios";

class BaseContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios
      .post("/send")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
            this.handleClick();
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
