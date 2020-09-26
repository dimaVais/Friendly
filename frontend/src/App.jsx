import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { About } from './cmps/About';
import { PetApp } from './pages/PetApp';
import { PetEdit } from './pages/PetEdit';
import { PetDetails } from './pages/PetDetails';
import { ShopDetails } from './pages/ShopDetails';
import { NavBar } from './cmps/NavBar';
import { userProfile } from './pages/userProfile';
import { Footer } from './cmps/Footer';

 class _App extends Component {


  componentDidMount(){
    document.title = "Friendly"
  }


  render() {
   
    

    return (
      <div className="App">
        <header >
          <NavBar  onToggleChatsList={this.onToggleChatsList}/>
        </header>
        <main>
          <Switch>
            <Route component={ShopDetails} path="/shop/:id" />
            <Route component={PetDetails}  path="/details/:id?" />
            <Route component={PetEdit} path="/edit/:id?" />
            <Route component={SignUp} path="/signup/:type?" />
            {/* <Route component={About} path="/about" /> */}
            <Route component={userProfile} path="/profile/:id" />
            <Route component={PetApp} path="/pet/:filterType?" />
            <Route component={Home} path="/" /> 
          {/* {this.state.isChatsList && <Route component={ChatsList} />}  */}
          </Switch>
        </main>
        {/* <footer>
          <Footer />
        </footer> */}
      </div >
    );
  }
  
}

const mapStateToProps = state => {
  return {
  }
}

export const App = connect(mapStateToProps)(_App)