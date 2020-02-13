
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CustomLayout from './containers/Layout.js';
import PostList from './containers/PostListView.js';
import Postform from './components/Postform.js';
import ProfilePage from './components/UserProfile/ProfilePage.js';
import Component from "./components/UserProfile/component";
import "./App.css";
class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <Component/>
        <CustomLayout>
          <Switch>
            <Route path='/feed'component={PostList}/> 
            <Route path='/profile' component={ProfilePage}/>
            <Route path='/upload'component={Postform}/>
          </Switch>
        </CustomLayout>   
      </div>
      </Router>
    );
  }

}

export default App;
