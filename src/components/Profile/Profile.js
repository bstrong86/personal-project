import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/reducer'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newWorkout:'',
            workouts: []
        }
    }
    componentDidMount(){
        this.getWorkouts()
        
    }
    getWorkouts = async () => {
        console.log(this.props)
        const {id} = this.props.id
        let res = await axios.get(`/auth/workouts/${id}`)
        this.setState({
            workouts: res.data
        })
        
    }
    createWorkout = async () => {
        const newWorkout = {
            name: this.state.newWorkout

        }
        console.log(newWorkout)
        const {id} = this.props.id
        try {
            let res = await axios.post(`/auth/workout/${id}`,newWorkout)
            console.log(newWorkout)
            this.getWorkouts()
            res.sendStatus(200)
            } catch (err){
            console.log(err)
        }
        
    }
    handleChange = async (prop, val) => {
        this.setState({
          [prop]:val
        })
    }
    render() {
        return (
            <div>Workouts
                <input placeholder="workout name" onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
                <button onClick={this.createWorkout}>Create Workout</button>
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
    updateUser
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile)