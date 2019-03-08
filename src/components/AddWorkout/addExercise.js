import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../../components/Workout/Workout'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/reducer'

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
        const {workout_id} = this.props.workout_id
        let res = await axios.get(`/auth/exercises/${workout_id}`)
        this.setState({
            exercises: res.data
        })
    }
    createExercise = async () => {
        const newExercise = {
            name:this.state.newExercise
        }
    }
    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    render() {
        
        return (
            <div>exercise
                <input placeholder="Exercise Name" onChange={e => {this.handleChange("name", e.target.value)}}/>
                <input placeholder="Exercise Sets" onChange={e => {this.handleChange("sets", e.target.value)}}/>
                <input placeholder="Exercise reps" onChange={e => {this.handleChange("reps", e.target.value)}}/>
                <input placeholder="Exercise weight" onChange={e => {this.handleChange("weight", e.target.value)}}/>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return {
        id: reduxState
    }
}
const mapDispatchToProps = {
    updateWorkout
}




export default connect(mapStateToProps, mapDispatchToProps)(addExercise)