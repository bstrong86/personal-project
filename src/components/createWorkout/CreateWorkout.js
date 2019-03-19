import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateWorkout} from '../../ducks/auth_reducer'
import {Link} from 'react-router-dom'

class CreateWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newWorkout:'',

        }
           
    }
 
        
    
    createWorkout = async () => {
        const newWorkout = {
            workout_name: this.state.newWorkout

        }
        console.log(this.props)
        const {user_id} = this.props
        // const {workout_id} = this.props
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
          [prop]:val
        })
    }
    backToWorkouts = () => {
        this.props.history.goBack()
    }
    render() {
        
        // const {workout_id}= this.state
        // console.log(workout_id)
        
        return (
            <div>Workouts
                <input placeholder="workout name" onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
            
                {/* <Link to={`/profile/addexercise/${workout_id}`}> */}
                    <button onClick={this.createWorkout}>Create Workout Name</button>
                    <button onClick={this.backToWorkouts}>Back to Profile</button>
                {/* </Link> */}
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




export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkout)