import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavbarC from './components/Navbar';
import Home from "./components/Home";
import Widgets from "./components/Widgets";
import Credits from './components/Credits';
import Game from './components/Game';

const widgetprods = [
  { name: 'Master Widget', price: '$125.00' },
  { name: 'Sub Widget', price: '$115.00' },
  { name: 'Long Widget', price: '$150.00' },
  { name: 'Short Widget', price: '$135.00' }
]

const App = () => {
  return (
    <Router>
      <div className='App'>
        <NavbarC title={'Wakanda'} />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/credits' component={Credits} />
            <Route exact path='/game' component={Game} />
  
            <Route
              exact
              path='/widgets'
              render={(props) =>
                <Fragment>

                  <Widgets prods={widgetprods} />

                </Fragment>
              }
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
};
export default App;