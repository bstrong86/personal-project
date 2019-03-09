import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateExercise} from '../../ducks/exercise_reducer'

class addExercise extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            sets:0,
            reps:0,
            weight:0,
        }
    }
    
    createExercise = async () => {
        const newExercise = {
            name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight
        }
        const {workout_id} = this.props
        try {
            let res = await axios.post(`/auth/exercise/${workout_id}`, newExercise)
            this.props.updateExercise(res.data)
            
            
        } catch (err) {
            console.log(err)
        }
    }
    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    render() {

        const {name} = this.props
        
        return (
            <div>Exercises
                <h3>{name}</h3>
                <input placeholder="Exercise Name" onChange={e => {this.handleChange("name", e.target.value)}}/>
                <input placeholder="Exercise Sets" onChange={e => {this.handleChange("sets", e.target.value)}}/>
                <input placeholder="Exercise Reps" onChange={e => {this.handleChange("reps", e.target.value)}}/>
                <input placeholder="Exercise Weight" onChange={e => {this.handleChange("weight", e.target.value)}}/>
                <button>Add Exercise</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)
    
}
const mapDispatchToProps = {
    updateExercise
}




export default connect(mapStateToProps, mapDispatchToProps)(addExercise)