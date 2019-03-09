import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../Workout/Workout'
import {connect} from 'react-redux'
import {updateWorkout} from '../../ducks/reducer'

class CreateWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newWorkout:''
        }
           
    }
 
        
    
    createWorkout = async () => {
        const newWorkout = {
            workout_name: this.state.newWorkout

        }
        console.log(newWorkout)
        const {user_id} = this.props.id
        try {
            let res = await axios.post(`/auth/workout/${user_id}`,newWorkout)
            console.log(res.data)
            this.props.updateWorkout(res.data)
            this.props.history.push('/profile/addexercise')
            } catch (err){
            console.log(err)
        }
        
    }
    handleChange = async (prop, val) => {
        this.setState({
          [prop]:val
        })
    }
    handleSearch = async () => {
        
    }
    render() {
        
        return (
            <div>Workouts
                <input placeholder="workout name" onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
                <button onClick={this.createWorkout}>Create Workout Name</button>
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