import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Exercise from '../../components/Exercise/Exercise'
import {updateWorkout} from '../../ducks/reducer'

class ViewWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercises: []
        }
    }
    componentDidMount(){
        this.getExercises()

    }
    getExercises = async () => {
        console.log(this.props)
        const {workout_id} = this.props
        let res = await axios.get(`/auth/exercises/${workout_id}`)
        this.setState({
            exercises: res.data
        })
    }
    
    render() {
        const mappedExercises = this.state.exercises.map((exercise) => {
            return (
                <Exercise 
                key={exercise.id}
                name={exercise.name}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                />
            )
        })
        return (
            <div>
                <div>{mappedExercises}</div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

}
const mapDispatchToProps = {
    updateWorkout
}




export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkout)