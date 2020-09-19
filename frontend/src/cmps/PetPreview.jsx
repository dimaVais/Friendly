import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'


export function PetPreview(props) {
    const { shop } = props.pet;
    const pet = props.pet;


    function displayEditButtons() {
        // if (!props.loggedinUser.isAdmin) return <div></div>

        return (
            <div className="btn-panel">
                <button className="btn btn-delete" onClick={() => { props.onRemove(pet._id) }}>Delete</button>
                <Link to={`edit/${pet._id}`} className="btn btn-edit">
                    Edit
                    </Link>
            </div>
        )
    }

    function isMale() {
        return (pet.gender === 'Male') ? true : false
    }

    // const image = pet.img ? require(`../assets/imgs/${car._id}.jpg`) : require(`../assets/imgs/default.jpg`)
    return (
        <NavLink to={`/details/${pet._id}`}>
            <div className="pet-preview">
                <img src={(pet.imgUrls) ? pet.imgUrls[0] : ''} alt="pet" />
                <div className="card-description">
                    <div className="card-description-header">
                        <h2 className="pet-name">{pet.name}</h2>
                        {/* <img className="gender-icon" src={require(`../assets/img/male-icon2.png`)} alt="male-icon"/> */}
                            {isMale() && <FontAwesomeIcon className="pet-gender-male-icon" icon={faMars} />} 
                            {!isMale() && <FontAwesomeIcon className="pet-gender-female-icon" icon={faVenus} />} 
                    </div>
                    <h4>{pet.summary}</h4>
                </div>

                <section className="pet-category flex">
                    {/* <img src={`../assets/img/${pet.gender.toLowerCase()}`} alt="gender"/>
                <img src={`../assets/img/${pet.size.toLowerCase()}`} alt="size"/> */}
                </section>
                {/* <section className="pet-reacts">
                    <ul> 
                    { pet.reactions && pet.reactions.map(reaction ,index => {
                        <li key={index}>
                            <img src={`../assets/img/${reaction.type}`} alt=""/>
                            <span>{reaction.count}</span>
                         </li>
                    })}
                    </ul>
                </section> */}
                {/* {displayEditButtons()} */}

            </div>
        </ NavLink>

    )
}
