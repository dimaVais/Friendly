import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input, InputLabel, Select } from '@material-ui/core';

import { TagsFilter } from './TagsFilter'
import { setFilter, loadPets } from '../store/actions/petActions.js'
import { FilterSearch } from './FilterSearch';
import { CategoryList } from './CategoryList';
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

    onFilterChange = async (obj) => {
        await this.props.setFilter({ ...this.props.filterBy, ...obj }, () => this.loadPets())
    }

    onSetCategory = async (_type) => {
        await this.setState({
            filterBy: {
                ...this.state.filterBy,
                type: _type
            }
        })
        this.onFilterChange({ 'type': _type })
    }

    handleInput = async ({ target }) => {
        const field = target.name;
        if (target.type === 'number') var value = +target.value;
        else value = target.value;
        await this.setState(prevState => {
            if (field === 'range') {
                return {
                    ...prevState,
                    filterBy: {
                        ...prevState.filterBy,
                        distance: {
                            ...prevState.filterBy.distance,
                            [field]: value
                        }
                    }
                }
            } else {
                return {
                    ...prevState,
                    filterBy: {
                        ...prevState.filterBy,
                        [field]: value
                    }
                }
            }
        });
        this.onFilterChange( this.state.filterBy );
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

    onToggleTag = ev => {
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
        const { isModalShown } = this.state
        // const btnClass=parent==='hero'?'hero-btn more-btn':'gallery-btn more-btn';
        return (
            <div className="filter-container flex column align-center">

                <section className="search-container flex space-around">
                    <FilterSearch parent="main" onInputChange={this.onInputChange} />
                    {/* { <button className="more-btn"  onClick={this.onToggleFilterModal}>More</button>} */}
                </section>
                <section className="category-container">
                    <CategoryList onCategoryChange={this.onSetCategory} />
                </section>
                <section>
                    <InputLabel htmlFor='Distance(km)'>Distance(km)</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: 'range',
                            type: "number"
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="20">20km</option>
                        <option value="50">50km</option>
                        <option value="100">100km</option>
                        <option value="200">200km</option>
                    </Select>
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
