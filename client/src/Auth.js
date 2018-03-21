import axios from "axios";

const Auth = {
  // token: returned by /login route, and must be set in the callback.
  token: "",
  // isAuthenticated: returns a bool indicating auth status.
  isAuthenticated() {
    if (token === "") {
      return false;
    } else {
      // Post to server with token to check if it's valid.
      axios
        .post("/auth", { token: this.token })
        .then(response => {
          const { authenticated } = response;
          // If the token is not valid, then reset token.
          if (!authenticated) {
            this.token = "";
          }
          return authenticated;
        })
        .catch(error => {
          throw error;
        });
    }
  }
};

export default Auth;
