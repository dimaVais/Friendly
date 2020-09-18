import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './pages/Home';
// import { LoginModal } from './cmps/LoginModal';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { PetApp } from './pages/PetApp';
import { PetEdit } from './pages/PetEdit';
import { PetDetails } from './pages/PetDetails';
import { ShopDetails } from './pages/ShopDetails';
import { NavBar } from './cmps/NavBar';

function _App(props) {
  return (
    <div className="App">
      <header className="flex align-center App-header">
        <div className="flex align-center header-div">
        <NavBar />
        </div>
      </header>
      <main>
        <Switch>
          <Route component={ShopDetails} path="/shop/:id" />
          <Route component={PetDetails} path="/details/:id?" />
          <Route component={PetEdit} path="/edit/:id?" />
          <Route component={SignUp} path="/signup" />
          <Route component={About} path="/about" />
          <Route component={PetApp} path="/pet/:filterType?" />
          {/* <Route component={Login} path="/login" /> */}
          <Route component={Home} path="/" /> 
        </Switch>
      </main>
    </div >
  );
}

const mapStateToProps = state => {
  return {
  }
}

export const App = connect(mapStateToProps)(_App)