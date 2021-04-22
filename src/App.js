import { BrowserRouter } from "react-router-dom";
import { useState, userContext, useMemo, useEffect } from "react";
import "./App.css";
import UserContext from "./auth/userContext";
import FrienderApi from "./api";
import NavBar from "./common/NavBar";
import { decodeToken } from "react-jwt";
import Routes from "./common/Routes";

function App() {
  const [token, setToken] = useState(FrienderApi.token);
  const [currentUser, setCurrentUser] = useState(null);
  const currentUsername = useMemo(
    () => (token ? decodeToken(token).username : null),
    [token]
  );
  const [allUsers, setAllUsers] = useState(null);

  async function getAllUsers() {
    const users = await FrienderApi.getAllUsers();
    setAllUsers(
      users.filter(
        (u) =>
          u.username !== currentUsername &&
          !currentUser.likes.includes(u.username) &&
          !currentUser.dislikes.includes(u.username) &&
          !currentUser.matches.includes(u.username)
      )
    );
  }

  useEffect(() => {
    async function getUser() {
      const user = await FrienderApi.getUser(currentUsername);
      setCurrentUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    if (currentUser) getAllUsers();
  }, [currentUser]);

  console.log("current user", currentUser);
  console.log("all users", allUsers);

  function filterUsers(usernameToRemove) {
    const updatedUsers = allUsers.filter((u) => u !== u.usernameToRemove);
    setAllUsers(updatedUsers);
  }

  async function updateToken(token) {
    setToken((t) => token);
    localStorage.setItem("userToken", token);
    FrienderApi.token = token;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ updateToken, filterUsers, allUsers, currentUser }}
      >
        <NavBar />
        <Routes />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
