import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Container } from 'bootstrap-4-react';
import Register from './components/signup';
import Dashboard from './components/dashboard'
import Login from './components/login'

function App() {
  return (
    <Router>
      <Container>
        <Container>
          <Navbar />

        </Container>

        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard} />



      </Container>
    </Router>
  );
}

export default App;
