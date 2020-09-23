import React, { Component } from 'react';

import { Input,Button,Switch,FormGroup,InputLabel,Select } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'


export class TagsFilter extends Component {
    
    state={
        

    }

    componentDidMount(){
        this.setState({...this.props.filterBy})
        console.log(this.props);
    }

    displayTags(tag,index){
        return (
            <div  key={index}>
                <label htmlFor="">{tag}</label>
                <Switch type="checkbox" name="" value={tag} />
            </div>
        )
    }
    onToggle(){

    }
    render(){
        const tags = ["Kids friendly","Healthy","Energetic","Sterilized"]

        return (
            <div className="tags-modal">
                <div className="container">
                <FormGroup>
                    {/* <section>
                        <InputLabel htmlFor="">Animal type</InputLabel>
                        <Input name="type" autoComplete="off"  type="text" value={this.state.type} />

                    </section> */}
                    <section className="gender">
                        <form >
                            <InputLabel htmlFor="">Gender</InputLabel>
                            <label htmlFor="male"><FontAwesomeIcon  className="pet-gender pet-gender-male-icon"  icon={faMars} /></label>
                             <label htmlFor="female"><FontAwesomeIcon name="gender" value="male" className="pet-gender pet-gender-female-icon"  icon={faVenus} /></label> 
                            <input type="radio" name="gender" id="male" value="male" onChange={this.props.handleChange}/>
                            <input type="radio" name="gender" id="female" value="female"  onChange={this.props.handleChange}/>
                        </form>
                     </section>
                    <section>
                        {/* <Input  list="breed" name="breed" autoComplete="off"  type="list" /> */}

                        <InputLabel htmlFor="age">Age</InputLabel>
                            <Select
                                native
                                onChange={this.props.handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                                >
                                <option aria-label="None" value="" />
                                <option value={1}>Puppy</option>
                                <option value={7}>Grown up</option>
                                <option value={15}>Old</option>
                            </Select>

                            {/* <InputLabel htmlFor="">Breed</InputLabel>

                        <input list="breed"/>

                                <datalist id="breed">
                                    <option value="kfj"/>
                                    <option value="Firefox"/>
                                    <option value="Google Chrome"/>
                                    <option value="Opera"/>
                                    <option value="Safari"/>
                                </datalist> */}
                        
                    </section>
                    <section>
                    <InputLabel htmlFor="size">Size</InputLabel>
                            <Select
                                native
                                onChange={this.props.handleChange}
                                inputProps={{
                                    name: 'size',
                                    id: 'age-native-simple',
                                }}
                                >
                                <option aria-label="None" value="" />
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="big">Big</option>
                            </Select>

                    </section>
                   
                    <section>
                            <InputLabel htmlFor="">{'Distance(km)'}</InputLabel>
                            <Input type="number" name="" min="1" id=""/>
                    </section>
                    {/* <section >
                        {tags.map((tag,index) => displayTags(tag,index))}
                    </section> */}
                    <Button variant="contained" onClick={this.props.onToggleFilterModal}>Close</Button>
                    {/* <Button variant="contained" onClick={this.props.onToggleFilterModal}>Show</Button> */}
                </FormGroup>  
                </div>  
             </div>
        )
    }
}
