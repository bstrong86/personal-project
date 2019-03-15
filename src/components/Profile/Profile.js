import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../../components/Workout/Workout'
import {connect} from 'react-redux'
import {updateUser, updateWorkout} from '../../ducks/auth_reducer'
import {Link} from 'react-router-dom'
import SearchResults from '../SearchResult/SearchResult';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts: [],
            search:'',
            searchResult:[],
        }
    }
    componentDidMount(){
        this.getWorkouts()
        let backButton = document.getElementById("backButton")
        backButton.style.display = "none"
        
    }


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
    handleBackToWorkouts = async () => {
        this.setState({
            searchResult: []
        })
        let workouts = document.getElementById("mappedWorkouts")
        let backButton = document.getElementById("backButton")
        let searchButton = document.getElementById("searchButton")
        searchButton.style.display = "block"
        workouts.style.display = "block"
        backButton.style.display = "none"
        

    }
    handleSearch = async () => {
        const {workouts, search} = this.state
        let searchedWorkout = workouts.filter(workout => workout.workout_name.includes(search))
            this.setState({
                searchResult: searchedWorkout,
            })
        let button = document.getElementById("searchButton")
            if (button.style.display === "none" ) {
                button.style.display = "block"
            } else {
                button.style.display = "none"
            }
        let results = document.getElementById("mappedWorkouts")
            if (this.state.search !== '') {
                if (results.style.display === "none") {
                    results.style.display = "block"
                } else {
                    results.style.display = "none"
                }}
        let backButton = document.getElementById("backButton")
            backButton.style.display = "block"        
    }
    render() {
        
        const mappedWorkouts = this.state.workouts.map((workout) => {
            return (
                <Workout
                    key={workout.workout_id}
                    name={workout.workout_name}
                    id={workout.workout_id}
                />
                
            )
        })

        const mappedSearchResults = this.state.searchResult.map((workout) => {
            return (
                <SearchResults
                    key={workout.workout_id}
                    name={workout.workout_name}
                    id={workout.workout_id}
                />
            )
        })
        return (
            <div>Workouts
                <input placeholder= "search" onChange={e => {this.handleChange("search", e.target.value)}}/>
                <button onClick={this.handleSearch} id ="searchButton">Search</button>
                <button onClick={this.handleBackToWorkouts} id ="backButton">Back to Workouts</button>
                <Link to='/profile/create'>
                    <button>Add New Workout</button>
                </Link>
                <div id = "mappedWorkouts">{mappedWorkouts}</div>
                <div id = "mappedSearchResults">{mappedSearchResults}</div>

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