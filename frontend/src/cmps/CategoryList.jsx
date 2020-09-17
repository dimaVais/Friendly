import React from 'react'

export function CategoryList() {
    return (
        <div className="category-list">
            <img src={require('../assets/img/category-dog.png')} alt="Dog"/>
            <img src={require('../assets/img/category-cat.jpg')} alt="Cat"/>
            <img src={require('../assets/img/category-farm.jpg')} alt="Farm"/>
            <img src={require('../assets/img/category-other.jpg')} alt="Other"/>
        </div>
    )
}
