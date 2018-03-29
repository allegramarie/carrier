import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor } from "grommet";
import Auth from "../Auth";
import Status from "grommet/components/icons/Status";

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
    console.log("Signing up!");
    var checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (checker.test(username)) {
      Auth.signup({ username, password })
        .then(results => {
          console.log("Successfully created new account!");
          this.setState({ redirect: true });
        })
        .catch(error => {
          this.setState({
            errors: ["Something went wrong. Do you have an account?"]
          });
        });
    } else {
      this.setState({
        errors: [
          <p>
            <Status value="warning" /> Email must be valid.
          </p>
        ]
      });
    }
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <LoginForm
        errors={this.state.errors}
        onSubmit={this.handleSubmit}
        title="Signup"
        forgotPassword={
          <Anchor path="/login" label="Been here before? Log in." />
        }
      />
    );
  }
}

export default Signup;
