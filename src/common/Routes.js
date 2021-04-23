import { Route, Switch, Redirect } from "react-router-dom";
import EditProile from "../Users/EditProfile";
import Home from "./Home";

function Routes({ signUp, loginUser }) {
  // const { token, isInvalidLogin } = useContext(UserContext);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* <Route exact path="/matches">
        {isAuthenticated ? <Matches /> : <Redirect to="/login" />}
      </Route> */}
      {/* <Route exact path="/login">
        <Login loginUser={loginUser} />
      </Route> */}
      {/* <Route exact path="/signup">
        <Signup signUp={signUp} />
      </Route> */}
      <Route exact path="/profile">
        <EditProile/>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
