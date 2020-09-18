import React from 'react'
import { NavLink } from 'react-router-dom'


export function CategoryList() {
    const categories=["dog","cat","farm","other"];

    function disCategories(category){
        return(
            <NavLink to={`pet/type/${category}`}><img src={require(`../assets/img/category-${category}.jpg`)} alt="Cat"/></NavLink> 
        )
    }
    return (
        <div className="category-list">
            
            {
                categories.map(category=>disCategories(category) )
              
            }
        </div>
    )
}
