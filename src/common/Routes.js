import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import { useContext } from "react";
import UserContext from "./userContext";

function Routes({ signUp, loginUser }) {
  const { token, isInvalidLogin } = useContext(UserContext);
  const isAuthenticated = Boolean(token);
  return (
    <Switch>
      <Route exact path="/">
        {isInvalidLogin ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route exact path="/matches">
        {isAuthenticated ? <Matches /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        <Login loginUser={loginUser} />
      </Route>
      <Route exact path="/signup">
        <Signup signUp={signUp} />
      </Route>
      <Route exact path="/profile">
        {isAuthenticated ? <Profile /> : <Redirect to="/profile" />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
