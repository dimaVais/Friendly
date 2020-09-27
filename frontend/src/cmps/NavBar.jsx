import React, { Component } from 'react'
import { NavLink, Router, withRouter } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import { connect } from 'react-redux';
import { loadShops } from '../store/actions/shopActions'
import { logout } from '../store/actions/userActions';
import { ChatsList } from './ChatsList';



class _NavBar extends Component {

    state = {
        showLoginModal: false,
        showChatsList:false,
        shop: '',
        shopId: '',
        pathName: ''
    }
    componentDidMount() {
        this.setState({pathName: this.props.history.location.pathname})
        
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.user && prevProps.user._id !== this.props.user._id) {
            await this.props.loadShops()
            const shops = this.props.shops
            if (this.props.user) {
                const { user } = this.props
                const userId = user._id
                const userShop = shops.find(shop => shop.owner._id === userId)
                if (userShop) this.setState({ shopId: userShop._id, shop: userShop })
            }
        }
    }

    onNavBarClick = () => {
        this.setState({ showLoginModal: !this.state.showLoginModal });
    }

    onLogOut = () => {
        this.props.logout();
        this.props.history.push('/');
    }
    onToggleChatsList=()=>{
        this.setState({showChatsList:!this.state.showChatsList})
      }

    render() {
        const { user } = this.props
        return (
        <div>
       
            <div className={this.props.history.location.pathname === '/' ? 'main-nav' : 'main-nav-not-home'}>
                <div className="left-nav">
                    <NavLink to="/"><img className="logo-up" src={require('../assets/img/logo.png')} alt="Home" /></NavLink>
                    <NavLink className="nav-btn" to="/pet">Gallery</NavLink>
                    <NavLink className="nav-btn" to="/about">About Us</NavLink>
                </div>
                <div className="right-nav">
                    {user && user.isOwner && this.state.shopId && <NavLink className="nav-btn" to={`/shop/${this.state.shopId}`}> <img className="shop-img" src={this.state.shop.imgUrls[0]} alt=""/> {this.state.shop.name}</NavLink>}

                    {user && !user.isOwner && !user.isGuest && <NavLink className="nav-btn" to={`/profile/${user._id}`}>{user.fullName}</NavLink>}

                    {user && !user.isGuest && <button className="chats-btn nav - btn" onClick={this.onToggleChatsList}>Chat</button>}

                    {user && user.isGuest && <button className="login-btn nav-btn" onClick={() => { this.onNavBarClick() }}>Login</button>}
                    {user && !user.isGuest && <button className="logout-btn nav - btn" onClick={() => { this.onLogOut() }}>Logout</button>}

                    {this.state.showLoginModal && <LoginModal onNavBarClick={this.onNavBarClick} />}

                    {user && user.isGuest && <NavLink className="nav-btn" to="/signup">Sign Up</NavLink>}
                </div>
            </div>
                {this.state.showChatsList && <ChatsList/>}
        </div>   
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loggedInUser,
        shops: state.shopReducer.shops

    };
};

const mapDispatchToProps = {
    loadShops,
    logout
}


export const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(_NavBar))

// export const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Header)