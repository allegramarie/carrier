import axios from "axios";

const Auth = {
  // token: returned by /login route, and must be set in the callback.
  token: "",
  userID: null,
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
    const state = {
      token: this.token,
      userID: this.userID
    };
    localStorage.setItem("auth", JSON.stringify(state));
  },
  initialize() {
    const storage = localStorage.getItem("auth");
    const state = storage !== "" ? JSON.parse(storage) : {};
    this.token = state ? state.token : "";
    this.userID = state ? state.userID : "";
    if (this.token && this.token !== "") {
      this.isAuthenticated = true;
    }
  },
  signup({ username, password }) {
    return axios
      .post("/signup", { username, password })
      .then(response => {
        const { token, userID } = response.data;
        console.log(`
        token: ${token}
        userID: ${userID}
        `);
        this.token = token;
        this.userID = userID;
        this.saveState();
        return Promise.resolve(response.data);
      })
      .catch(error => {
        console.log("Returned a bad?");
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
        // console.log(response.data)
        this.saveState();
        return Promise.resolve(response.data);
      })
      .catch(Promise.reject);
  },
  logout() {
    console.log("logging out");
    axios
      .post("/logout", { token: this.token })
      .then(res => console.log("awesome, it worked"))
      .catch(err => console.log("it did not work"));
    this.token = "";
    this.isAuthenticated = false;
    this.saveState();
  }
};

Auth.initialize();

export default Auth;
