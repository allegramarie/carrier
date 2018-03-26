import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor } from "grommet";
import Auth from "../Auth";

// TODO: Refactor into single Authentication component
// to handle login and signup on one route.
class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { redirect: false, errors: [] };
  }

  handleSubmit(event) {
    const { username, password } = event;
    console.log("Loggin in!");
    Auth.signup({ username, password }).then(results => {
      console.log("Successfully created new account!");
      this.setState({ redirect: true });
    });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <LoginForm
        errors={this.state.errors}
        onSubmit={this.handleSubmit}
        title="Signup"
        forgotPassword={<Anchor path="/signup" label="First time here?" />}
      />
    );
  }
}

export default Signup;
