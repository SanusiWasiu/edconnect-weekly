import React from 'react'
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
