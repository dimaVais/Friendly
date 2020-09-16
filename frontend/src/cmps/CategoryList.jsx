import React from 'react'

export function CategoryList() {
    return (
        <div className="category-list">
            <img style={{width: '200px', height: '200px'}} src={require('../assets/img/category-dog.png')} alt="Dog"/>
            <img style={{width: '200px', height: '200px'}} src={require('../assets/img/category-cat.jpg')} alt="Cat"/>
            <img style={{width: '200px', height: '200px'}} src={require('../assets/img/category-farm.jpg')} alt="Farm"/>
            <img style={{width: '200px', height: '200px'}} src={require('../assets/img/category-other.jpg')} alt="Other"/>
        </div>
    )
}
