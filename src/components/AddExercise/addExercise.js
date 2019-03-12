import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Exercise from '../Exercise/Exercise'
import {updateExercise} from '../../ducks/exercise_reducer'
import {updateWorkout} from '../../ducks/auth_reducer'

class addExercise extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercises:[],
            name:'',
            sets:0,
            reps:0,
            weight:0,
        }
    }
    componentDidMount(){
        this.getExercises()
    }
    getExercises = async () => {
        const {workout_id} = this.props
        let res = await axios.get(`/auth/exercises/${workout_id}`)
        console.log(res)
        this.setState({
            exercises: res.data
        })
    }
    
    
    
    createExercise = async () => {
        const newExercise = {
            exercise_name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight,
            workouts_name:this.props.workout_id
        }
        const {workout_id} = this.props
        try {
            let res = await axios.post(`/auth/exercise/${workout_id}`, newExercise)
            this.props.updateExercise(res.data)
            this.getExercises()
            
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
        const {workout_name} = this.props
        console.log(this.props)
        
        const mappedExercises = this.state.exercises.map((exercise) => {
            return (
                <Exercise
                key={exercise.exercise_id}
                name={exercise.exercise_name}
                reps={exercise.reps}
                sets={exercise.sets}
                weight={exercise.weight}
                />
            )
        })
        
        return (
            <div>Exercises
                <h3>{workout_name}</h3>
                <input placeholder="Exercise Name" onChange={e => {this.handleChange("name", e.target.value)}}/>
                <input type = "number" placeholder="Exercise Sets" onChange={e => {this.handleChange("sets", e.target.value)}}/>
                <input type = "number"  placeholder="Exercise Reps" onChange={e => {this.handleChange("reps", e.target.value)}}/>
                <input type = "number"  placeholder="Exercise Weight" onChange={e => {this.handleChange("weight", e.target.value)}}/>
                <button onClick= {this.createExercise}>Add Exercise</button>
                <div>{mappedExercises}</div>
            </div>
            
        )
    }
}
const mapStateToProps = reduxState => {
    return {
        workout_id: reduxState.auth_reducer.workout_id,
        workout_name: reduxState.auth_reducer.workout_name
    }
    
}
const mapDispatchToProps = {
    updateExercise,
    updateWorkout
}




export default connect(mapStateToProps, mapDispatchToProps)(addExercise)