import React, {Component} from 'react'
import axios from 'axios'
import './Exercise.scss'



class Exercise extends Component {
    constructor(props) {
        super(props)
        this.state ={
            sets: props.sets,
            reps: props.reps,
            weight: props.weight,
            disabled: true,
            buttonDisplay:''
        }
    }
    
    componentDidMount(){
        this.setState({
            sets: this.props.sets,
            reps: this.props.reps,
            weight: this.props.weight
        })
        let saveButton = document.getElementById("SaveButton")
        saveButton.style.display = "none"
    }
    

    handleEdit = () => {
        console.log(44444)
        this.setState({
            disabled: !this.state.disabled,
            
        })
        let button = document.getElementById("EditButton")
            if(button.style.display === "none") {
                button.style.display = "block"
            } else {
                button.style.display = "none"
            }
        let saveButton = document.getElementById("SaveButton")
            saveButton.style.display = "block"

    }
    handleSave = async () => {
        let exercise = {
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.reps,
        }        
        try {
            await axios.put(`/auth/exercise/${this.props.exercise_id}`, exercise)
            console.log(33333)
        } catch (err) {console.log(err)}
        console.log(22222)

    }
    handleSaveButton = () => {
        this.setState({
            disabled: !this.state.disabled
        })
        console.log(11111)
        let editButton = document.getElementById("EditButton")
            editButton.style.display = "block"
        let saveButton = document.getElementById("SaveButton")
            saveButton.style.display = "none"
    }
    handleChange = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }
    deleteExercise = async () => {
        const {exercise_id} = this.props        
        axios.delete(`/auth/exercise/${exercise_id}`)
        this.props.getExercises()
    }
    saveButton = () => {
        this.handleSave()
        this.handleSaveButton()
        
    }
    render() {        
        const {name, sets, reps, weight} = this.props
        return (
            <div className="exerciseBox">
                <h2 className="mappedExerciseName">{name}</h2>
                <div>sets</div>
                <input maxLength={4} onFocus={e => e.target.select()} disabled={(this.state.disabled)} type = "number"  value={this.state.sets} className = "exerciseSets" placeholder= {sets} onChange={e => this.handleChange("sets",e.target.value)}></input>
                <div>reps</div>
                <input maxLength={4} onFocus={e => e.target.select()} disabled={(this.state.disabled)} type = "number"  value={this.state.reps} className = "exerciseReps" placeholder= {reps} onChange={e => this.handleChange("reps",e.target.value)}></input>
                <div>weight</div>
                <input maxLength={4} onFocus={e => e.target.select()} disabled={(this.state.disabled)} type = "number"  value={this.state.weight} className = "exerciseWeight" placeholder= {weight} onChange={e => this.handleChange("weight",e.target.value)}></input>
                

                <div className="mappedExerciseButtons">
                    <button className="editExerciseButton" id="EditButton" onClick={this.handleEdit}>Edit Exercise</button>
                    <button className="saveExerciseButton" id="SaveButton" onClick={this.saveButton}>Save</button>
                    <button className="deleteExerciseButton" onClick={this.deleteExercise}>Delete</button>
                </div>
            </div>
        )

    } 
}


export default (Exercise)
