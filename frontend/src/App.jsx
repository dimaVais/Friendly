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
import {Chat} from './cmps/Chat.jsx'
import { toggleChat } from './store/actions/chatActions.js';

 class _App extends Component {

  state={
    isChatShown:false
  }

  componentDidMount(){
    this.setState({isChatShown:this.props.isChatShown})
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props) this.setState({isChatShown:this.props.isChatShown})
  }


  render() {
   
    

    return (
      <div>
        <header >
          <NavBar  onToggleChatsList={this.onToggleChatsList}/>
        </header>
        <main>
          {this.state.isChatShown && <Chat/>}
          <Switch>
            <Route component={ShopDetails} path="/shop/:id" />
            <Route component={PetDetails}  path="/details/:id?" />
            <Route component={PetEdit} path="/edit/:id?" />
            <Route component={SignUp} path="/signup/:type?" />
            <Route component={userProfile} path="/profile/:id" />
            <Route component={PetApp} path="/pet/:filterType?" />
            <Route component={Home} path="/" /> 
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div >
    );
  }
  
}

const mapStateToProps = state => {
  return {
      isChatShown: state.chatReducer.isChatShown,
     
  }
}

const mapDispatchToProps = {
  toggleChat
}

export const App = connect(mapStateToProps)(_App)