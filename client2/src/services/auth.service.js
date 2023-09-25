import axios from "axios";
const API = "https://mern-server-dbab.onrender.com/api/user";

class AuthService {
  register(username, email, password, role) {
    return axios.post(API + "/register", { username, email, password, role });
  }

  login(email, password) {
    return axios.post(API + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("mainkey");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("mainkey"));
  }
}

export default new AuthService();
