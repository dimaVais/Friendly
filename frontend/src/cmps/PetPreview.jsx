import React from 'react'
import { Link } from 'react-router-dom';

// import carImg from '../assets/imgs/i101.jpg'

export function PetPreview({ pet,remove }) {
    const {shop}=pet;


    function displayEditButtons() {
        // if (!props.loggedinUser.isAdmin) return <div></div>

        return (
                <div className="btn-panel">
                    <div className="btn btn-delete" onClick={remove(pet._id)}>Delete</div>
<<<<<<< HEAD
                    <Link to="edit/id" className="btn btn-edit">
=======
                    <Link to={'/edit'} className="btn btn-edit">
>>>>>>> 1851e16dd63d821c4e6f698267aa5e8a46094284
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
<<<<<<< HEAD
                {displayEditButtons()}
            </section>
            <section className="pet-reacts">
                <ul>
                    {/* {pet.reacts && pet.reacts.map(reac,index => {
=======
                
            </section>
            <section className="pet-reacts">
                {/* <ul>
                    {pet.reacts && pet.reacts.map(react,index => {
>>>>>>> 1851e16dd63d821c4e6f698267aa5e8a46094284
                        <li key={index}>
                            <img src={`../assets/img/${reac.type}`} alt=""/>
                            <span>{reac.count}</span>
                         </li>
<<<<<<< HEAD
                    })}  */}
                </ul>
=======
                    })} 
                </ul> */}
>>>>>>> 1851e16dd63d821c4e6f698267aa5e8a46094284
            </section>
        </div>
    )
}
