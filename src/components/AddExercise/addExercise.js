import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import ShowAddedExercises from '../ShowAddedExercises/ShowAddedExercises'
import {updateExercise, updateExerciseList, updateExercisePath, clearExercisePath} from '../../ducks/exercise_reducer'
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
    }
    
    
    
    createExercise = async () => {
        const newExercise = {
            exercise_name: this.state.name.toUpperCase(),
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight,
            workouts_name:this.props.workout_id
        }
        const {id} = this.props.match.params
        try {
            await axios.post(`/auth/exercise/${id}`, newExercise)            
        } catch (err) {
            console.log(err)
        }
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
        if(this.props.exercise_path !== ''){
            this.props.history.push('/profile')
        } else{
            this.props.history.goBack()
        }
    }
    
    render() {
        const mappedExercises = this.props.exercise_list.map((exercise) => {
            return (
                <ShowAddedExercises
                key={exercise.exercise_id}
                name={exercise.exercise_name}
                id={exercise.exercise_id}
                getExercises={this.getExercises}
                />
            )
        })
        
        return (
            <div className="AddExercisePage">
                <h3 className="AddExerciseHeader">Add Exercises</h3>
                <div className="AddExerciseInputs">
                    <div style={{position:"relative"}}>
                        <h3>Name</h3>
                        <input  maxLength={24} value={this.state.name} onFocus={e => e.target.select()} placeholder="Exercise Name" onChange={e => {this.handleChange("name", e.target.value)}}/>
                    </div>
                    <div>
                        <h3>Sets</h3>
                        <input maxLength={4} value={this.state.sets} onFocus={e => e.target.select()} type = "number" placeholder="Exercise Sets" onChange={e => {this.handleChange("sets", e.target.value)}}/>
                    </div>
                    <div>
                        <h3>Reps</h3>                
                        <input maxLength={4} value={this.state.reps} onFocus={e => e.target.select()} type = "number"  placeholder="Exercise Reps" onChange={e => {this.handleChange("reps", e.target.value)}}/>
                    </div>
                    <div>
                        <h3>Weight</h3>               
                        <input maxLength={4} value={this.state.weight} onFocus={e => e.target.select()} type = "number"  placeholder="Exercise Weight" onChange={e => {this.handleChange("weight", e.target.value)}}/>
                    </div>
                </div>
                <button onClick= {this.handleAddButton}>Add Exercise</button>
                <button onClick={this.handleFinishButton}>Back to Workout</button>
                <div className="MappedExerciseBox">{mappedExercises}</div>
            </div>
            
        )
    }
}
const mapStateToProps = reduxState => {
    return {
        workout_id: reduxState.auth_reducer.workout_id,
        workout_name: reduxState.auth_reducer.workout_name,
        exercise_id: reduxState.exercise_reducer.exercise_id,
        sets: reduxState.exercise_reducer.sets,
        reps: reduxState.exercise_reducer.reps,
        weight: reduxState.exercise_reducer.weight,
        exercise_list: reduxState.exercise_reducer.exercise_list,
        exercise_path: reduxState.exercise_reducer.exercise_path
    }
    
}
const mapDispatchToProps = {
    updateExercise,
    updateWorkout,
    updateExerciseList,
    updateExercisePath,
    clearExercisePath
}




export default connect(mapStateToProps, mapDispatchToProps)(addExercise)