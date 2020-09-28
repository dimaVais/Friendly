import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input,InputLabel } from '@material-ui/core';

import { TagsFilter } from './TagsFilter'
import { setFilter, loadPets } from '../store/actions/petActions.js'
import { FilterSearch } from './FilterSearch';
import { CategoryList } from './CategoryList'
// import SearchIcon from '@material-ui/icons/Search';

class _PetFilter extends Component {

    state = {
        parent: '',
        filterBy: {
            type: '',
            gender: '',
            breed: '',
            size: '',
            txt: '',
            distance: {
                lat: 0,
                lon: 0,
                range: 0
            }
        },
        position: {
            lat: 0,
            lon: 0,
        },
        isModalShown: false,
        tags: []

    }

    async componentDidMount() {
        await navigator.geolocation.getCurrentPosition(
            this.getUserPosition,
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }

    getUserPosition = async (position) => {
        const distance = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            range: 0
        }
        await this.setState({ filterBy: { ...this.state.filterBy, distance: distance } });
    }

    componentDidUpdate() {
        console.log(this.props.pets);
    }
    onFilterChange = (obj) => {
        this.updateFilterAndLoad(obj)
    }

    handleInput = ({ target }) => {
        const field = target.name;
        if (target.type === 'number') var value = +target.value;
        else value = target.value;

        this.setState(prevState => {
            return {
                ...prevState,
                filterBy: {
                    ...prevState.filterBy,
                    [field]: value
                }
            }
        })
    }
    
    onToggleFilterModal = () => {
        this.setState({ isModalShown: !this.state.isModalShown })
    }
    onApplyFilter = () => {
        this.onToggleFilterModal()
    }

    resetFilter = async () => {

        await this.setState({
            ...this.state.filterBy,
            type: '',
            gender: '',
            breed: '',
            size: '',
            txt: ''
        });
        this.props.setFilter(this.state.filterBy, () => this.props.loadPets())
    }

    async updateFilterAndLoad(obj) {
        await this.props.setFilter({ ...this.props.filterBy, ...obj }, () => this.loadPets())
    }
    onToggleTag = ev => {
        console.log('toggled:', ev.target.value);
        const tag = ev.target.value;
        let tags = [...this.state.tags]
        if (tags.includes(tag)) {
            tags.splice(tags.indexOf(tag), 1);
        } else {
            tags.push(tag)
        }
        this.setState({ tags })
        console.log(this.state.tags);
    }

    render() {
        const { isModalShown, parent } = this.state
        // const btnClass=parent==='hero'?'hero-btn more-btn':'gallery-btn more-btn';
        return (
            <div className="filter-container flex column align-center">

                <section className="search-container flex space-around">
                    <FilterSearch parent="main" onInputChange={this.onInputChange} />
                    {/* { <button className="more-btn"  onClick={this.onToggleFilterModal}>More</button>} */}
                </section>
                <section className="category-container">
                    <CategoryList onCategoryChange={this.onFilterChange} />
                </section>
                <section>
                    <InputLabel htmlFor="">{'Distance(km)'}</InputLabel>
                    <Input type="number" name="distance.range" min="1" id="" onChange={this.handleInput} />
                </section>
                {isModalShown && <TagsFilter filterBy={this.props.filterBy} onToggleTag={this.onToggleTag} onFilterChange={this.onFilterChange} onToggleFilterModal={this.onToggleFilterModal} />}

                <br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterBy: state.petReducer.filterBy
    }
}

const mapDispatchToProps = {
    setFilter,
    loadPets
}


export const PetFilter = connect(mapStateToProps, mapDispatchToProps)(_PetFilter)
