import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm, Anchor } from "grommet";
import Auth from "../Auth";
import Status from "grommet/components/icons/Status";
import Bird from "./bird.png";

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
      <div>
        <img
          src={Bird}
          style={{
            position: "absolute",
            left: "42%",
            height: "100px",
            marginTop: "30px"
          }}
        />

        <div style={{ position: "absolute", left: "32%", marginTop: "80px" }}>
          <LoginForm
            align="center"
            errors={this.state.errors}
            onSubmit={this.handleSubmit}
            title="Login"
            forgotPassword={<Anchor path="/signup" label="First time here?" />}
          />
        </div>
      </div>
    );
  }
}

export default Login;
