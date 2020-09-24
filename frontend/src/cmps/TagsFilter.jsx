import React, { Component } from 'react';

import { Input,Button,Switch,FormGroup,InputLabel,Select } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'


export class TagsFilter extends Component {
    
    state={
        gender:{
            txt:'',
            male:false,
            female:false
        },
        distance:{
            range:0
        }

    }

    componentDidMount(){
        // this.setState({...this.state)
        console.log(this.props);
    }

    
    onGenderChange=async (gender)=>{
        let genderDefault={
            male:false,
            female:false
        }
        genderDefault = {...genderDefault,[gender]:!this.state.gender[gender]}
        console.log(genderDefault);
        await this.setState({...this.state,gender:{...genderDefault}})
    }
    onDistanceChange=async (ev)=>{
        const distance=ev.target.value
        console.log(distance);
    }
    
    
    
    onShow=()=>{
        if(this.state.gender.male!==this.gender.female) {
            
        }
        // this.props.onFilterChange({'gender':gender})
        console.log(this.state);
        this.props.onToggleFilterModal();
    }
    onClear=()=>{

    }
    displayTags(tag,index){
        return (
            <div  key={index}>
                <label htmlFor="">{tag}</label>
                <Switch type="checkbox" name="" value={tag} />
            </div>
        )
    }
    displayGenderBtns(){
        const {gender}=this.state
        return(
            <section className="gender">                    
                <InputLabel htmlFor="">Gender</InputLabel>
                <div className={gender.male?'pet-gender pressed':'pet-gender'} onClick={()=>this.onGenderChange('male')}><FontAwesomeIcon  className=" pet-gender-male-icon"  icon={faMars} /></div>
                <div className={gender.female?'pet-gender pressed':'pet-gender'} onClick={()=>this.onGenderChange('female')}><FontAwesomeIcon  className=" pet-gender-female-icon"  icon={faVenus} /></div>
            </section>
        )
    }

    render(){
        const tags = ["Kids friendly","Healthy","Energetic","Sterilized"]

        return (
            <div className="tags-modal">
                <div className="container">
                <FormGroup>
                    {this.displayGenderBtns()}
                    <section>

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
                            <Input type="number" name="" min="1" id="" onChange={this.onDistanceChange}/>
                    </section>
                    {/* <section >
                        {tags.map((tag,index) => displayTags(tag,index))}
                    </section> */}
                    <section className="btns-container"></section>
                        <Button variant="contained" onClick={this.onShow}>Show</Button>
                        <Button variant="contained" onClick={this.onClear}>Clear</Button>
                </FormGroup>  
                </div>  
             </div>
        )
    }
}
