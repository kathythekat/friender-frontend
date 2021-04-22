import axios from axios;

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class FrienderApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getAllUsers() {
    const res = await this.request(`users`);
    return res.users;
  }

  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async update(username, data) {
    const res = await this.request(`users/${username}`,data, "patch");
    return res.user;
  }

  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res;
  }

}