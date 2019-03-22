import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import ShowAddedExercises from '../ShowAddedExercises/ShowAddedExercises'
import {updateExercise, updateExerciseList} from '../../ducks/exercise_reducer'
import {updateWorkout} from '../../ducks/auth_reducer'

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
    componentDidMount(){
        this.getExercises()
    }
    
    
    getExercises = async () => {
        const {id} = this.props.match.params
        let res = await axios.get(`/auth/exercises/${id}`)
        this.props.updateExerciseList(res.data)
        console.log(res.data)
    }
    
    
    
    createExercise = async () => {
        const newExercise = {
            exercise_name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight,
            workouts_name:this.props.workout_id
        }
        const {id} = this.props.match.params
        console.log(id)
        try {
            let res = await axios.post(`/auth/exercise/${id}`, newExercise)
            this.props.updateExercise(res.data)
            
            
        } catch (err) {
            console.log(err)
        }
        this.history.push(`/auth/addexercise/${this.props.workout_id}`)
    }
    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    resetFields = () => {
        this.setState({
            name:'',
            sets:0,
            reps:0,
            weight:0
        })
    }
    handleAddButton = () => {
        this.createExercise()
        this.resetFields()
        this.getExercises()
    }
    handleFinishButton = () => {
        this.props.history.goBack()
    }
    
    render() {console.log(this.props)
        
        const mappedExercises = this.props.exercise_list.map((exercise) => {
            return (
                <ShowAddedExercises
                key={exercise.exercise_id}
                name={exercise.exercise_name}
                id={exercise.exercise_id}
                />
            )
        })
        
        return (
            <div>
                <h3>Add Exercises</h3>
                <input value={this.state.name} placeholder="Exercise Name" onChange={e => {this.handleChange("name", e.target.value)}}/>
                <input  value={this.state.sets} type = "number" placeholder="Exercise Sets" onChange={e => {this.handleChange("sets", e.target.value)}}/>
                <input value={this.state.reps} type = "number"  placeholder="Exercise Reps" onChange={e => {this.handleChange("reps", e.target.value)}}/>
                <input value={this.state.weight} type = "number"  placeholder="Exercise Weight" onChange={e => {this.handleChange("weight", e.target.value)}}/>
                <button onClick= {this.handleAddButton}>Add Exercise</button>
                <button onClick={this.handleFinishButton}>Back to Workout</button>
                <div>{mappedExercises}</div>
            </div>
            
        )
    }
}
const mapStateToProps = reduxState => {
    console.log(reduxState)
    return {
        workout_id: reduxState.auth_reducer.workout_id,
        workout_name: reduxState.auth_reducer.workout_name,
        exercise_id: reduxState.exercise_reducer.exercise_id,
        sets: reduxState.exercise_reducer.sets,
        reps: reduxState.exercise_reducer.reps,
        weight: reduxState.exercise_reducer.weight,
        exercise_list: reduxState.exercise_reducer.exercise_list
    }
    
}
const mapDispatchToProps = {
    updateExercise,
    updateWorkout,
    updateExerciseList
}




export default connect(mapStateToProps, mapDispatchToProps)(addExercise)