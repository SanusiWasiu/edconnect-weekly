import React from 'react';
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import CreateProject from './CreateProject';
import Project from './Project';
import Layout from './shared/Layout'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/projects/submit' component={CreateProject} />
        <Route path='/projects' component={Project} />
        <Route path='/projects/:id' component={Project} />
        <Route path="*" render={()=><Layout><div className="text-center p-5"><h1>Oops!!! Page not found</h1></div></Layout> }/>
      </Switch>
    </Router>
  );
}

export default App;
