import React from 'react'
import { Link } from 'react-router-dom';

// import carImg from '../assets/imgs/i101.jpg'

export function PetPreview(props) {
    const {shop} = props.pet;
    const pet = props.pet;


    function displayEditButtons() {
        // if (!props.loggedinUser.isAdmin) return <div></div>

        return (
                <div className="btn-panel">
                    <button className="btn btn-delete" onClick={props.onRemove(pet._id)}>Delete</button>
                    <Link to={`edit/${pet._id}`} className="btn btn-edit">
                        Edit
                    </Link>
                </div>
        )
    }
    // const image = pet.img ? require(`../assets/imgs/${car._id}.jpg`) : require(`../assets/imgs/default.jpg`)
    return (
        <div className="pet-preview">
           <img src={pet.image} alt="pet"/>
           <h2 className="pet-name">{pet.name}</h2>
            <section className="shop-container">
                {/* <img src={shop.imgUrl} alt="shop"/> */}
                {/* <div>{shop.rate}</div>
                <h3>{shop.fullName}</h3> */}
            </section>
            <h4>{pet.summary}</h4>
            <section className="pet-category flex">
                <img src={`../assets/img/${pet.gender.toLowerCase()}`} alt="gender"/>
                <img src={`../assets/img/${pet.size.toLowerCase()}`} alt="size"/>
            </section>
            <section className="pet-reacts">
                {/* <ul> */}
                    {/* {pet.reacts && pet.reacts.map(reac,index => {
                        <li key={index}>
                            <img src={`../assets/img/${reac.type}`} alt=""/>
                            <span>{reac.count}</span>
                         </li>
                    })}  */}
                {/* </ul> */}
            </section>
            {displayEditButtons()}
        </div>
    )
}
