import React, { Component } from "react";
import LoginForm from "grommet/components/LoginForm";

class Login extends Component {
  constructor(props) {
    super(props);

    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  render() {
    return <LoginForm title="Sample Title" />;
  }
}

export default Login;
