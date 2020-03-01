import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomLayout from "./containers/Layout.js";
import PostList from "./containers/PostListView.js";
import Postform from "./components/Postform.js";
import ProfilePage from "./components/UserProfile/ProfilePage.js";
import Registration from "./components/register/form.js";
import LoginForm from "./components/login/form.js";
import { AuthContext } from "./context/auth";
import Feed from "./components/feed/Feed";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("token") || ""
  );
  const setTokens = data => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthTokens(data);
  };

  console.log(authTokens);
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App">
          <CustomLayout>
            <Switch>
              <Route path="/" exact component={LoginForm} />
              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/upload" component={Postform} />
              <Route path="/register" component={Registration} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </CustomLayout>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
