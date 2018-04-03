import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor, Section, Box } from "grommet";
import Auth from "../Auth";
import Status from "grommet/components/icons/Status";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      redirect: false,
      errors: []
    };
  }

  handleSubmit(event) {
    const { username, password } = event;
    var checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (checker.test(username)) {
      Auth.login({ username, password })
        .then(result => {
          this.setState({ redirect: true });
        })
        .catch(error => {
          this.setState({
            errors: ["Something went wrong. Try again?"]
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
      <Redirect to="/" />
    ) : (
      <Section align="center">
        <Box flex="center" seperator={false} fixed={false}>
          <LoginForm
            errors={this.state.errors}
            onSubmit={this.handleSubmit}
            title="Login"
            forgotPassword={<Anchor path="/signup" label="First time here?" />}
          />
        </Box>
      </Section>
    );
  }
}

export default Login;
