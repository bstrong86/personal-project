import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../../components/Workout/Workout'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/reducer'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newWorkout:'',
            workouts: [],
            search:''
        }
    }
    componentDidMount(){
        this.getWorkouts()
        
    }
    componentDidUpdate(){
        this.getWorkouts()
    }

    getWorkouts = async () => {
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
    handleSearch = async () => {
        
    }
    render() {
        const mappedWorkouts = this.state.workouts.map((workout) => {
            return (
                <Workout
                key={workout.id}
                name={workout.name}
                />
            )
        })
        return (
            <div>Workouts
                <input placeholder= "search" onChange={e => {this.handleChange("searchWorkout", e.target.value)}}/>
                <button onClick={this.handleSearch}>Search</button>
                
                <input placeholder="workout name" onChange={e => {this.handleChange("newWorkout", e.target.value)}} />
                
                <button onClick={this.createWorkout}>Create Workout</button>
                <div>{mappedWorkouts}</div>

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