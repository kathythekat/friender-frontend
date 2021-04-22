//show random user profile if logged in

import { useContext } from "react";
import UserContext from "../auth/userContext";
import Profile from "../Users/Profile";
import { Link } from "react-router-dom";

//if not logged in, show login page.
function Home() {
  const { currentUser, allUsers } = useContext(UserContext);

  function loginStatus() {
    if (currentUser) {
      return (
        <div>
          <h2>Welcome Back, {currentUser.username} </h2>
          {allUsers && allUsers.length > 0 && <Profile user={allUsers[0]} />}
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      );
    }
  }
  return (
    <div>
      <h1>
        <b>Friender</b>
      </h1>
      <h4>Choose your friend wisely.</h4>
      {loginStatus()}
    </div>
  );
}
export default Home;
