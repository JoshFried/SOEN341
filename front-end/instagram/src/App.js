import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CustomLayout from './containers/Layout.js';
import PostList from './containers/PostListView.js';
import Postform from './components/Postform.js';
import ProfilePage from './components/UserProfile/ProfilePage.js';
import Registration from './components/register/form.js';
import LoginForm from './components/login/form.js';
import Stylesheet from './components/myStyles.css';


class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <CustomLayout>
          <Switch>
            <Route path='/' exact component={LoginForm}/>
            <Route path='/feed'component={PostList}/> 
            <Route path='/profile' component={ProfilePage}/>
            <Route path='/upload'component={Postform}/>
            <Route path="/register" component={Registration}/>
            <Route path='/login'component={LoginForm}/>
          </Switch>
        </CustomLayout>   
      </div>
      </Router>
    );
  }
}

export default App;
