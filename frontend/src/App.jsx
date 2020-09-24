import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { PetApp } from './pages/PetApp';
import { PetEdit } from './pages/PetEdit';
import { PetDetails } from './pages/PetDetails';
import { ShopDetails } from './pages/ShopDetails';
import { NavBar } from './cmps/NavBar';
import { userProfile } from './pages/userProfile';

 class _App extends Component {

  componentDidMount(){
    document.title = "Friendly"
  }

  render() {
   
    

    return (
      <div className="App">
        <header >
          <NavBar  />
        </header>
        <main>
          <Switch>
            <Route component={ShopDetails} path="/shop/:id" />
            <Route component={PetDetails}  path="/details/:id?" />
            <Route component={PetEdit} path="/edit/:id?" />
            <Route component={SignUp} path="/signup/:type?" />
            <Route component={About} path="/about" />
            <Route component={userProfile} path="/profile/:id" />
            <Route component={PetApp} path="/pet/:filterType?" />
            <Route component={Home} path="/" /> 
          </Switch>
        </main>
      </div >
    );
  }
  
}

const mapStateToProps = state => {
  return {
  }
}

export const App = connect(mapStateToProps)(_App)