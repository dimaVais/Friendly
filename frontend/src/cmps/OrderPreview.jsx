import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faComment, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/userService';
import { UserData } from './UserData.jsx';
import { toggleChat } from '../store/actions/chatActions.js';


 class _OrderPreview extends Component {


    state = {
        showUserModal: false,
        user: null,
        isUndreadMsg:false
    }

    componentDidMount() {
        this.setUnreadCount();
    }
    componentDidUpdate(preProps){
        if (preProps!==this.props){
        this.setUnreadCount();

        }
    }

    setUnreadCount=()=>{
        console.log('Chats:',this.props.chats);
        const chat= this.props.chats.find(chat => {
            return (chat.members.includes(this.props.loggedInUser._id) && chat.members.includes(this.props.order.buyer._id))
        }) 
        console.log(chat);
        if (!chat || chat.length>0) return
        const isUndreadMsg = chat.msgs.some(msg=>{
            console.log(!msg.isRead );
            console.log((msg.authorId !== this.props.loggedInUser._id));
            return !msg.isRead && (msg.authorId !== this.props.loggedInUser._id)
        });
        this.setState({isUndreadMsg})
        console.log(this.state);
    }
    onToggleModal = async () => {
        this.setState({ showUserModal: !this.state.showUserModal })
        const user = await userService.getById(this.props.order.buyer._id)
        await this.setState({ user })
    }
    onToggleChat = () => {
        console.log(this.props);
        this.props.toggleChat({'userId':this.props.order.buyer._id})
    }

    orderClass = () => {
        let orderClass;
        if (this.props.order.status === 'accepted') orderClass = 'accepted';
        else if (this.props.order.status === 'denied') orderClass = 'denied';
        else orderClass = 'pending';
        return orderClass;
    }

    render() {
        const { order, onSave, onRemove, isShop, loggedInUser } = this.props
        const isModalClass = (this.props.inModal) ? 'modal-order-preview' : '';
        const display = (this.state.showUserModal) ? "grid" : "hidden";
        const btnIcon = (this.state.showUserModal) ? faTimesCircle : faInfoCircle;
        const user = this.state.user;
        if (!order) return <h3 style={{ display: 'none' }}>loading...</h3>
        return (
            <div className={`order-preview ${isModalClass} ${this.orderClass}`}>
                {
                    isShop &&
                    <div className="order-preview-details">
                        <p>{order.buyer.fullName} <span>Wants to Adopt</span> {order.pet.name}</p>
                        <div className="contact-user-actions-btns">
                                <button className="order-data-btn" onClick={this.onToggleModal}>
                                    <FontAwesomeIcon icon={btnIcon} />
                                </button>
                            <div>
                                <button className="order-data-btn" onClick={this.onToggleChat}>
                                    <FontAwesomeIcon icon={faComment} />
                                </button>
                                {/* {this.state.isUndreadMsg && <div className="unread-badge"></div>} */}

                            </div>

                        </div>

                    </div>
                }

                {!isShop && loggedInUser._id === order.buyer._id &&
                    <div>
                        <Link to={`/shop/${order.shop._id}`}>
                            {<p> <span>Request to adopt </span> {order.pet.name}
                                <span> from:</span> {order.shop.name} {order.shop.type} </p>}
                        </Link>
                    </div>
                }

                <div className="order-actions-btns-box">
                    {isShop && <button className="accept-order-btn order-btn" onClick={() => { onSave(order, 'accepted') }}>Accept</button>}
                    {isShop && <button className="pending-order-btn order-btn" onClick={() => { onSave(order, 'pending') }}>Pending</button>}
                    {isShop && <button className="reject-order-btn order-btn" onClick={() => { onSave(order, 'denied') }}>Reject</button>}
                    {(isShop || (!isShop && loggedInUser._id === order.buyer._id)) &&
                        <button className="remove-order-btn order-btn" onClick={() => { onRemove(order._id) }}>Remove</button>}
                </div>

                {isShop && user && <UserData user={user} display={display} />}

            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chatReducer.chats,
        loggedInUser: state.userReducer.loggedInUser

    }
}

const mapDispatchToProps = {

    toggleChat

}
export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)
