import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class FrienderApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
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
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async delete(username) {
    const res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res;
  }

  static async likeUser(username, likedUsername) {
    const res = await this.request(
      `${username}/like/${likedUsername}`,
      {},
      "post"
    );
    return res;
  }

  static async dislikeUser(username, dislikedUsername) {
    const res = await this.request(
      `${username}/dislike/${dislikedUsername}`,
      {},
      "post"
    );
    return res;
  }

  static async sendMessage(data) {
    const res = await this.request("messages", data, "post");
    return res.message;
  }

  static async getMessage(id) {
    const res = await this.request(`messages/${id}`);
    return res.message;
  }

  static async markRead(id) {
    const res = await this.request(`messages/${id}/read`, {}, "post");
    return res.markRead;
  }
}

FrienderApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYxOTEyNjUwOH0.y8-JU_iF-OEw1M_tgHWegDWP9B-rZwHJQlsw04JNBx8";

export default FrienderApi;
