import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateWorkout} from '../../ducks/auth_reducer'
// import {updateExercise} from '../../ducks/exercise_reducer'


class Exercise extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: '',
            sets:0,
            reps:0,
            weight:0,
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
            exercise_name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.reps
        }
        try {
            let res = await axios.put(`/auth/exercise/${this.props.exercise_id}`, exercise)
            // this.props.updateExercise(res.data)
        } catch (err) {console.log(err)}
    }
    handleChange = (prop, value) => {
        this.setState({
            [prop]: value
        })
    }
    deleteExercise = async () => {
        const {exercise_id} = this.props
        try{
            await axios.delete(`/auth/exercise/${exercise_id}`)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {name, sets, reps, weight} = this.props
        return (
            <div>
                <input disabled={(this.state.disabled)} value={this.state.name} className = "exerciseName" placeholder= {name} onChange={e => this.handleChange("name",e.target.value)}></input>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.sets} className = "exerciseSets" placeholder= {sets} onChange={e => this.handleChange("sets",e.target.value)}></input>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.reps} className = "exerciseReps" placeholder= {reps} onChange={e => this.handleChange("reps",e.target.value)}></input>
                <input disabled={(this.state.disabled)} type = "number"  value={this.state.weight} className = "exerciseWeight" placeholder= {weight} onChange={e => this.handleChange("weight",e.target.value)}></input>
                

                {/* <input></input>
                <input></input>
                <input></input>
                <input></input> */}
                <button className="editButton"  onClick={this.handleEdit}>Edit Exercise</button>
                <button className="saveButton" onClick={this.saveExercise}>Save</button>
                <button className="deleteExercise" onClick={this.deleteExercise}>Delete</button>
            </div>
        )

    } 
}
// const mapStateToProps = reduxState => {
//     return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

// }
// const mapDispatchToProps = {
//     updateWorkout,
//     updateExercise
// }




export default (Exercise)
