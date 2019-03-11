import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../../components/Workout/Workout'
import {connect} from 'react-redux'
import {updateUser, updateWorkout} from '../../ducks/auth_reducer'
import {Link} from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts: [],
            search:''
        }
    }
    componentDidMount(){
        this.getWorkouts()
        
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.workouts !== this.state.workouts){
    //         this.getWorkouts()
    //     }
    // }

    getWorkouts = async () => {
        const {user_id} = this.props
        let res = await axios.get(`/auth/workouts/${user_id}`)
        this.setState({
            workouts: res.data
        })
        
    }
      
    handleChange = async (prop, val) => {
        this.setState({
          [prop]:val
        })
    }
    handleSearch = async () => {
        
    }
    render() {
        console.log(this.state.workouts)
        
        const mappedWorkouts = this.state.workouts.map((workout) => {
            return (
            
            

                <Workout
                key={workout.workout_id}
                name={workout.workout_name}
                id={workout.workout_id}
                />
                
            )
        })
        return (
            <div>Workouts
                <input placeholder= "search" onChange={e => {this.handleChange("searchWorkout", e.target.value)}}/>
                <button onClick={this.handleSearch}>Search</button>
                <Link to='/profile/create'>
                    <button>Add New Workout</button>
                </Link>
                <div>{mappedWorkouts}</div>

            </div>
        )
    }
    
}
const mapStateToProps = reduxState => {
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

}
const mapDispatchToProps = {
    updateUser,
    updateWorkout
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile)