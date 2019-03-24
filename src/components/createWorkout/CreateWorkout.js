import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateWorkout} from '../../ducks/auth_reducer'

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
            <div>Workouts
                <input placeholder="workout name" maxLength={24} onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
            
                    <button onClick={this.createWorkout}>Create Workout Name</button>
                    <button onClick={this.backToWorkouts}>Back to Profile</button>
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