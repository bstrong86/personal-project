import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateWorkout} from '../../ducks/auth_reducer'
import {updateExercisePath} from '../../ducks/exercise_reducer'
import './CreateWorkout.scss'

class CreateWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newWorkout:'',

        }
           
    }
    componentDidMount = () =>{
        const {path} = this.props.match
        let exercise_path ={path}
        this.props.updateExercisePath(exercise_path)
        console.log(exercise_path)
    }
        
    
    createWorkout = async () => {
        const newWorkout = {
            workout_name: this.state.newWorkout

        }
        console.log(this.props)
        const {user_id} = this.props
        try {
            let res = await axios.post(`/auth/workout/${user_id}`,newWorkout)
            this.props.updateWorkout(res.data)
            const {workout_id} = res.data
            this.props.history.push(`/profile/addexercise/${workout_id}`)
            } catch (err){
            console.log(err)
        }
        
    }
    handleChange = async (prop, val) => {
        this.setState({
          [prop]:val.toUpperCase()
        })
    }
    backToWorkouts = () => {
        this.props.history.goBack()
    }
    render() {
       
        
        return (
            <div className="CreateWorkoutPage">
            <h3 className="CreateWorkoutHeader">Create a Workout</h3>
                <input className="CreateWorkoutInput" placeholder="Workout Name" maxLength={24} onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
                <div className="CreateWorkoutButtons">
                    <button onClick={this.createWorkout}>Create Workout</button>
                    <button onClick={this.backToWorkouts}>Back to Profile</button>
                </div>
            </div>
        )
    }
    
}
const mapStateToProps = reduxState => {
    return {
        exercise_path: reduxState.exercise_reducer.path,
        user_id: reduxState.auth_reducer.user_id,
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
    updateWorkout,
    updateExercisePath
}




export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkout)