import React, {Component} from 'react'
import axios from 'axios'



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
    handleEdit = () => {
        this.setState({
            disabled: !this.state.disabled,
            
        })           
    }
    handleSave = async () => {
        let exercise = {
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.reps
        }
        try {
            let res = await axios.put(`/auth/exercise/${this.props.exercise_id}`, exercise)
        } catch (err) {console.log(err)}
    }
    handleChange = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }
    deleteExercise = () => {
        const {exercise_id, workout_id} = this.props        
        axios.delete(`/auth/exercise/${exercise_id}`)
        // this.props.history.push(`/auth/viewWorkout/${workout_id}`)
    }

    render() {        
        const {name, sets, reps, weight} = this.props
        return (
            <div>
                <h2>{name}</h2>
                <div>sets</div>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.sets} className = "exerciseSets" placeholder= {sets} onChange={e => this.handleChange("sets",e.target.value)}></input>
                <div>reps</div>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.reps} className = "exerciseReps" placeholder= {reps} onChange={e => this.handleChange("reps",e.target.value)}></input>
                <div>weight</div>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.weight} className = "exerciseWeight" placeholder= {this.state.weight} onChange={e => this.handleChange("weight",e.target.value)}></input>
                

               
                <button className="editButton"  onClick={this.handleEdit}>Edit Exercise</button>
                <button className="saveButton" onClick={this.handleSave}>Save</button>
                <button className="deleteExercise" onClick={this.deleteExercise}>Delete</button>
            </div>
        )

    } 
}


export default (Exercise)
