import axios from "axios";

const Auth = {
  // token: returned by /login route, and must be set in the callback.
  token: "",
  // TODO: Remove hard coded value
  userID: 1,
  isAuthenticated: false,
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
    if (this.token && this.token !== "") {
      this.isAuthenticated = true;
    }
  },
  signup({ username, password }) {
    return axios
      .post("/signup", { username, password })
      .then(response => {
        const { token, userID } = response.data;
        this.token = token;
        this.userID = userID;
        console.log(response.data);
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  login({ username, password }) {
    return axios
      .post("/login", { username, password })
      .then(response => {
        const { token, userID } = response.data;
        this.token = token;
        this.isAuthenticated = true;
        this.userID = userID;
        this.saveState();
        return Promise.resolve(response.data);
      })
      .catch(Promise.reject);
  },
  logout() {
    axios.post("/logout", { token: this.token });
    this.token = "";
    this.isAuthenticated = false;
    this.saveState();
  }
};

Auth.initialize();

export default Auth;
