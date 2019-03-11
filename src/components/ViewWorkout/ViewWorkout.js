import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Exercise from '../../components/Exercise/Exercise'
import {updateWorkout} from '../../ducks/auth_reducer'

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
        let res = await axios.get(`/auth/exercises/${id}`)
        console.log(res.data)
        this.setState({
            exercises: res.data
        })
    }
    
    render() {
        // console.log(this)
        const mappedExercises = this.state.exercises.map((exercise) => {
            return (
                <Exercise 
                key={exercise.exercise_id}
                name={exercise.exercise_name}
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