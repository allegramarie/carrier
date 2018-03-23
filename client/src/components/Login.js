import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "grommet/components/LoginForm";
import axios from "axios";
import Auth from "../Auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { redirect: false, errors: [] };
  }

  handleSubmit(event) {
    console.log("submitted");
    const { username, password } = event;
    axios
      .post("/login", { username, password })
      .then(response => {
        const { token } = response.data;
        console.log(`Logged in and recieved: ${token}`);
        Auth.token = token;
        Auth.isAuthenticated = true;
        Auth.saveState();
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
        title="Sample Title"
      />
    );
  }
}

export default Login;
