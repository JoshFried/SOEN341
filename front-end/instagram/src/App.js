import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomLayout from "./containers/Layout.js";
import PostList from "./containers/PostListView.js";
import Postform from "./components/Postform.js";
import ProfilePage from "./components/UserProfile/ProfilePage.js";
import UpdateProfile from "./components/UserProfile/UpdateProfile.js";
import Registration from "./components/register/form.js";
import LoginForm from "./components/login/form.js";
import { AuthContext } from "./context/auth";
import { CommentContext } from "./context/comment";
import { ModalContext } from "./context/modal";
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

  const [createdComment, setCreatedComment] = useState(false);

  const setComment = () => {
    setCreatedComment(!createdComment);
  };
  const [showModal, setShowModal] = useState(false);

  const setModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <CommentContext.Provider
        value={{ createdComment, setCreatedComment: setComment }}
      >
        <ModalContext.Provider value={{ showModal, setShowModal: setModal }}>
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
                  <Route path="/editprofile" component={UpdateProfile} />
                  <Route path="/:username" children={<ProfilePage />} />
                </Switch>
              </CustomLayout>
            </div>
          </Router>
        </ModalContext.Provider>
      </CommentContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
