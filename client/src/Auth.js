import axios from "axios";

const Auth = {
  // token: returned by /login route, and must be set in the callback.
  token: "",
  isAuthenticated: false,
  // isAuthenticated: returns a bool indicating auth status.
  authenticate(callback) {
    // Post to server with token to check if it's valid.
    axios
      .post("/auth", { token: this.token })
      .then(response => {
        this.isAuthenticated = response.data.authenticated;
        // If the token is not valid, then reset token.
        if (!this.isAuthenticated) {
          this.token = "";
        }
        this.saveState();
        callback(this.isAuthenticated);
      })
      .catch(error => {
        throw error;
      });
  },
  saveState() {
    localStorage.setItem("auth", this.token);
  },
  initialize() {
    this.token = localStorage.getItem("auth");
  },
  logout() {
    axios.post("/logout", { token: this.token }).then(results => {
      this.token = "";
      this.isAuthenticated = false;
    });
  }
};

Auth.initialize();

export default Auth;
