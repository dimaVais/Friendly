import React from 'react'
// import carImg from '../assets/imgs/i101.jpg'

export function PetPreview({  }) {
    const pet={
        name:"Bobi",
        summary: "Energetic and happy dog",
        imgUrls:["../assets/img/cow.jpg"],
        bDate: 12321312,
        gender: "Male",
        breed: "Golden retreiver",
        size: "Small",
        isInRisk: true,
        shop: {
            fullName: "Freedom Farm",
            imgUrl: "../assets/img/user.jpg",
            rate: 4
          },
          reacts:[{
            type:"love",
            count:4
          },
          {
            type:"food",
            count:10
          }
        ]
    }
    const {shop}=pet;
    // const image = pet.img ? require(`../assets/imgs/${car._id}.jpg`) : require(`../assets/imgs/default.jpg`)
    return (
        <div className="pet-preview">
           <img src={pet.image} alt="pet"/>
           <h2 className="pet-name">pet.name</h2>
            <section className="shop-container">
                <img src={shop.imgUrl} alt="shop"/>
                <div>{shop.rate}</div>
                <h3>{shop.fullName}</h3>
            </section>
            <h4>{pet.summary}</h4>
            <section className="pet-category flex">
                <img src={`../assets/img/${pet.gender.toLowerCase()}`} alt="gender"/>
                <img src={`../assets/img/${pet.size.toLowerCase()}`} alt="size"/>
            </section>
            <section className="pet-reacts">
                <ul>
                    pet.reacts.map((react,index)=>{
                        <li key={index}>
                            <img src={`../assets/img/${react.type}`} alt=""/>
                            <span>{react.count}</span>
                         </li>
                    })
                </ul>
            </section>
        </div>
    )
}
