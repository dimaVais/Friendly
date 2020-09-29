import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setFilter, loadPets } from '../store/actions/petActions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { animateScroll as scroll } from "react-scroll";


class _FilterSearch extends Component {

    state = {
        txt: '',
        isClearShown: false
    }

    async componentDidMount() {
        await this.setState({ txt: this.props.filterBy.txt });
        await this.setState({ parent: this.props.parent });
        this.setState({ isClearShown: this.state.txt !== '' })
        if (this.props) {
            console.log(this.props);
        }

    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ txt: this.props.filterBy.txt });
            this.setState({ isClearShown: this.state.txt !== '' })
        }
    }

    onInputChange = async (ev) => {
        console.log(ev.target.value);
        const txt = ev.target.value;
        this.setState({ isClearShown: txt !== '' })
        await this.setState({ txt });
        if (!txt && this.state.parent !== 'hero') await this.onSearch();
    }
    keyPress = (e) => {
        if (e.keyCode == 13) {
            this.onSearch();

        }
    }
    onClear = async () => {
        this.setState({ txt: '' })
        this.props.setFilter({ txt: '' }, () => this.props.loadPets())
        this.setState({ isClearShown: false })
    }

    onSearch = async () => {
        await this.props.setFilter({ txt: this.state.txt }, () => this.props.loadPets())
        console.log(this.props)

        if (this.state.parent === 'hero') this.props.history.push('/pet')

    }

    render() {
        return (
            <section className="search-container flex">
                <div className="input-container">
                    <input className="search"
                        type="text"
                        name="search"
                        value={this.state.txt}
                        autoComplete="off"
                        placeholder="Find a friend (i.e. small, cat, puppy)"
                        onChange={(ev) => this.onInputChange(ev)}
                        onKeyDown={this.keyPress} />
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    <FontAwesomeIcon className={this.state.isClearShown ? 'clear-icon' : 'clear-icon hidden'}
                        onClick={this.onClear} icon={faTimesCircle} />
                </div>
                <div className="btn-search" onClick={this.onSearch}>Search</div>
                {/* <div className="icons-container">
                </div> */}
            </section>
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

export const FilterSearch = withRouter(connect(mapStateToProps, mapDispatchToProps)(_FilterSearch));


