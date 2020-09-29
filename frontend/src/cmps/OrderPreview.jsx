import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { UserDataModal } from './UserDataModal';



export class OrderPreview extends Component {

    state = {
        showUserModal: false,
        user: null
    }

    componentDidMount() {

    }

    showModal = async () => {
        console.log('hey');
        this.setState({ showUserModal: !this.state.showUserModal })
        const user = await userService.getById(this.props.order.buyer._id)
        await this.setState({ user })
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
        const isModalClass = (this.props.inModal)? 'modal-order-preview' : 'ddd';
        console.log('props',this.props);
        const user = this.state.user
        if (!order) return <h3 style={{ display: 'none' }}>loading...</h3>
        return (
            <div className={`order-preview ${isModalClass} ${this.orderClass}`}>
                {
                    isShop && <div  className="order-preview-details">
                        <p onClick={this.showModal}>{order.buyer.fullName} <span>Wants to Adopt</span> {order.pet.name} </p>
                    </div>

                }
                {/* {
                    isShop && <div className="order-preview-details">
                        <Link to={`/profile/${order.buyer._id}`}>  <p>{order.buyer.fullName} <span>Wants to Adopt</span> {order.pet.name} </p></Link>
                    </div>

                } */}
                {this.state.showUserModal && user && <UserDataModal closeModal={this.showModal} user={user} />}

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
            </div >
        )
    }
}




// export function OrderPreview({ order, onSave, onRemove, isShop, loggedInUser }) {

//     function orderClass() {
//         let orderClass;
//         if (order.status === 'accepted') orderClass = 'accepted';
//         else if (order.status === 'denied') orderClass = 'denied';
//         else orderClass = 'pending';
//         return orderClass;
//     }



//     if (!order) return <h3 style={{ display: 'none' }}>loading...</h3>
//     return (
//         <div className={`order-preview ${orderClass()}`}>
//             {
//                 isShop && <div className="order-preview-details">
//                     <Link to={`/profile/${order.buyer._id}`}>  <p>{order.buyer.fullName} <span>Wants to Adopt</span> {order.pet.name} </p></Link>
//                 </div>

//             }
//             {  <UserDataModal />}

//             {!isShop && loggedInUser._id === order.buyer._id &&
//                 <div>
//                     <Link to={`/shop/${order.shop._id}`}>
//                         {<p> <span>Request to adopt </span> {order.pet.name}
//                             <span> from:</span> {order.shop.name} {order.shop.type} </p>}
//                     </Link>
//                 </div>
//             }

//             <div className="order-actions-btns-box">
//                 {isShop && <button className="accept-order-btn order-btn" onClick={() => { onSave(order, 'accepted') }}>Accept</button>}
//                 {isShop && <button className="pending-order-btn order-btn" onClick={() => { onSave(order, 'pending') }}>Pending</button>}
//                 {isShop && <button className="reject-order-btn order-btn" onClick={() => { onSave(order, 'denied') }}>Reject</button>}
//                 {(isShop || (!isShop && loggedInUser._id === order.buyer._id)) &&
//                     <button className="remove-order-btn order-btn" onClick={() => { onRemove(order._id) }}>Remove</button>}
//             </div>
//         </div >
//     )
// }