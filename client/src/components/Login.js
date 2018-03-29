import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor } from "grommet";
import Auth from "../Auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { redirect: false, errors: [] };
  }

  handleSubmit(event) {
    const { username, password } = event;
    Auth.login({ username, password })
      .then(result => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({
          errors: ["Something went wrong. Try again?"]
        });
      });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <LoginForm
        errors={this.state.errors}
        onSubmit={this.handleSubmit}
        title="Login"
        forgotPassword={<Anchor path="/signup" label="First time here?" />}
      />
    );
  }
}

export default Login;
