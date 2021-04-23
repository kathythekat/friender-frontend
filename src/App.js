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

  function checkToken() {
    if(localStorage.getItem('token')) {
      const lToken = localStorage.getItem('token');
      FrienderApi.token = lToken;
      return lToken;
    }
    return null;
  }

   //pass down setter function instead of wrapper function. 
  function updateToken(token) {
    setToken(t => token);
    FrienderApi.token = token;
    localStorage.setItem('token', token);
  }

  function removeToken() {
    setToken(null);
    FrienderApi.token = null;
    localStorage.removeItem('token');
  }


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

  function filterUsers(usernameToRemove) {
    const updatedUsers = allUsers.filter((u) => u !== u.usernameToRemove);
    setAllUsers(updatedUsers);
  }

  async function updateToken(token) {
    setToken((t) => token);
    localStorage.setItem("userToken", token);
    FrienderApi.token = token;
  }

  async function updateUser(formData) {
    const response = await FrienderApi.update(currentUser.username, formData)
    setCurrentUser(currentUser => ({...currentUser, response}))
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ updateUser, updateToken, filterUsers, allUsers, currentUser }}
      >
        <NavBar />
        <Routes updateToken={updateToken} removeToken={removeToken}/>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
