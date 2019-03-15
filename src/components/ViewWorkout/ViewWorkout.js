import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Exercise from '../../components/Exercise/Exercise'
import {updateWorkout} from '../../ducks/auth_reducer'
import {Link} from 'react-router-dom'
import addExercise from '../AddExercise/addExercise'

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

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.exercises !== this.state.exercises) {
    //         this.getExercises()
    //     }
    // }
    getExercises = async () => {
        const {id} = this.props.match.params
        // let workout_id = Number.parseInt(id)
        let res = await axios.get(`/auth/exercises/${id}`)
        console.log(res.data)
        this.setState({
            exercises: res.data
        })
    }
    // addNewExercise = async () => {
    //     const {id} = this.props.match.params
    //     let workout_id = id
    //     let res = await axios.post(`/auth/exercises/${workout_id}`)
    // }
    handleProfileButton = () => {
        this.props.history.push('/profile')
    }
    
    render() {
        const {id} = this.props.match.params
        const mappedExercises = this.state.exercises.map((exercise) => {
            return (
                <Exercise 
                key={exercise.exercise_id}
                name={exercise.exercise_name}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                exercise_id={exercise.exercise_id}
                />
            )
        })
        console.log(id)
        return (
            <div>
                <div>{mappedExercises}</div>
                    <Link to = {`/profile/addexercise/${id}`} >
                        <button>Add New Exercise</button>
                    </Link>
                    <button onClick= {this.handleProfileButton}>Back to Profile</button>
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