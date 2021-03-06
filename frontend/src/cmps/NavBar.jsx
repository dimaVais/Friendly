import React, { Component } from 'react'
import { NavLink, Router, withRouter } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import { connect } from 'react-redux';
import { loadShops } from '../store/actions/shopActions'
import { logout } from '../store/actions/userActions';
import { ChatsList } from './ChatsList';
import { toggleChat } from '../store/actions/chatActions.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'


class _NavBar extends Component {

    state = {
        showLoginModal: false,
        showChatsList: false,
        shop: '',
        shopId: '',
        pathName: '',
        unReadMsgCount: 0,
        chats:[]
    }
    componentDidMount() {
        this.setState({ pathName: this.props.history.location.pathname })
        // this.setState({chats:this.props.chats},()=>this.setUnreadMsgCount())
        
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
        // if (prevProps !== this.props) {
        //     console.log('NavBar updated');
        //     this.setState({chats:this.props.chats},()=>this.setUnreadMsgCount())
        // }
    }

    onNavBarClick = () => {
        this.setState({ showLoginModal: !this.state.showLoginModal });
        this.setState({ showChatsList: false })

    }

    onLogOut = () => {
        this.props.logout();
        this.props.history.push('/');
        this.setState({ showChatsList: false })
        this.props.toggleChat()

    }
    onToggleChatsList = () => {
        this.setState({ showChatsList: !this.state.showChatsList })
    }
    setUnreadMsgCount() {
        let unReadMsgCount = 0;
        // console.log(this.props.chats);
        if (this.state.chats.length === 0) return

        this.state.chats.forEach(chat => {
            if (chat.msgs.some(msg => !msg.isRead && msg.authorId !== this.props.user._id)) unReadMsgCount++;
        })
        // console.log('Unread msgs:', unReadMsgCount);
        this.setState({ unReadMsgCount })
    }

    render() {
        const { user } = this.props
        return (
            <div>

                <div className={this.props.history.location.pathname === '/' ? 'main-nav' : 'main-nav-not-home'}>
                    <div className="left-nav">
                        <NavLink to="/"><img className="logo-up" src={require('../assets/img/logo.png')} alt="Home" /></NavLink>
                        <NavLink className="nav-btn" to="/pet">Gallery</NavLink>
                    </div>
                    <div className="right-nav">

                        {user && user.isOwner && this.state.shopId && <NavLink className="nav-btn shop-btn" to={`/shop/${this.state.shopId}`}> <img className="shop-img" src={this.state.shop.imgUrls[0]} alt="" /> {this.state.shop.name}</NavLink>}
                        {user && !user.isOwner && !user.isGuest && <NavLink className="nav-btn" to={`/profile/${user._id}`}>{user.fullName}</NavLink>}

                        {user && !user.isGuest && <div className="chats-btn nav-btn" onClick={this.onToggleChatsList}>
                            <FontAwesomeIcon className="send-icon" icon={faComments} />
                            {this.state.unReadMsgCount > 0 && <div className="unread-msgs-count">{this.state.unReadMsgCount}</div>}
                        </div>}

                        {user && user.isGuest && <button className="login-btn nav-btn" onClick={() => { this.onNavBarClick() }}>Login</button>}
                        {user && !user.isGuest && <button className="logout-btn nav - btn" onClick={() => { this.onLogOut() }}>Logout</button>}

                        {this.state.showLoginModal && <LoginModal onNavBarClick={this.onNavBarClick} />}

                        {user && user.isGuest && <NavLink className="nav-btn" to="/signup">Sign Up</NavLink>}
                    </div>
                </div>
                {this.state.showChatsList && <ChatsList onToggleChatsList={this.onToggleChatsList} />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loggedInUser,
        shops: state.shopReducer.shops,
        chats: state.chatReducer.chats
    };
};

const mapDispatchToProps = {
    loadShops,
    logout,
    toggleChat
}


export const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(_NavBar))

// export const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Header)