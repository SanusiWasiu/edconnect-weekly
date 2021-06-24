import React from 'react'
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route />
      </Switch>
    </Router>
  );
}

export default App;
