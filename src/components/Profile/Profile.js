import React, {Component} from 'react'
import axios from 'axios'
import Workout from '../../components/Workout/Workout'
import {connect} from 'react-redux'
import {updateUser, updateWorkout,updateWorkoutList} from '../../ducks/auth_reducer'
import {Link} from 'react-router-dom'
import SearchResults from '../SearchResult/SearchResult';
import './Profile.scss'


class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search:'',
            searchResult:[],
            disabled: true,
        }
    }
    componentDidMount(){
        let backButton = document.getElementById("backButton")
        backButton.style.display = "none"
        this.getWorkouts()
        // this.getMarvelPic()
    }

    // getMarvelPic = async () =>{
    //     let url =`https://gateway.marvel.com:443/v1/public/characters?apikey=6eaf49b75fa40c1a9d9bacc61a54c728`
    //     let ts = new Date().getTime()
    //     let hash = CryptoJS.MD5(ts+PRIVATE_API_KEY+PUBLIC_API_KEY)
    //     url +="&ts="+ts+"&hash="+hash
    //     let res = await axios.get(url)
    //         console.log(res.data)
    // }
    

    componentDidUpdate(prevProps) {
        if (!prevProps.user_id && this.props.user_id) {
            this.getWorkouts(this.props.user_id)
        }
    }

    getWorkouts = async userId => {
        let res = await axios.get(`/auth/workouts/${userId}`)
        this.props.updateWorkoutList(res.data)
    }
      
    handleChange = async (prop, val) => {
        this.setState({
          [prop]:val
        })
        if(this.state.search === ""){
            this.setState({
                disabled : false
            })
        }
    }
    handleBackToWorkouts = async () => {
        this.setState({
            searchResult: [],
            search:''
        })
        let workouts = document.getElementById("mappedWorkouts")
        let backButton = document.getElementById("backButton")
        let searchButton = document.getElementById("searchButton")
        let searchListDisplay = document.getElementById("mappedSearchResults")
        searchButton.style.display = "block"
        workouts.style.display = "block"
        backButton.style.display = "none"
        searchListDisplay.style.display = "none"
        

    }
    handleSearch = async () => {
        const {workout_list} = this.props
        let searchedWorkout = workout_list.filter(workout => workout.workout_name.includes(this.state.search))
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
            let searchListDisplay = document.getElementById("mappedSearchResults")
            searchListDisplay.style.display = "block"
       
    }
    render() {
        console.log(111111, this.props)

        const mappedWorkouts = this.props.workout_list.map((workout) => {
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
            
            <div className="ProfileWorkoutList">
                <input value= {this.state.search} className="SearchWorkouts" id="searchInput" placeholder= "search" onChange={e => {this.handleChange("search", e.target.value)}}/>
                <button disabled={this.state.disabled} onClick={this.handleSearch} id ="searchButton">Search</button>
                <button onClick={this.handleBackToWorkouts} id ="backButton">Back to Workouts</button>
                <Link className="AddNewWorkoutBox" to='/profile/create'>
                    <button>Add New Workout</button>
                </Link>
                <h2 className="WorkoutListHeader">Workouts</h2>
                <div id = "mappedWorkouts">{mappedWorkouts}</div>
                <div id = "mappedSearchResults">{mappedSearchResults}</div>

            </div>
        )
    }
    
}
const mapStateToProps = reduxState => {
    return {
        workout_list: reduxState.auth_reducer.workout_list,
        user_id: reduxState.auth_reducer.user_id,
        username: reduxState.auth_reducer.username,
        profile_pic: reduxState.auth_reducer.profile_pic,
        workout_name: reduxState.auth_reducer.workout_name,
        workout_id: reduxState.auth_reducer.workout_id

    }

}
const mapDispatchToProps = {
    updateUser,
    updateWorkout,
    updateWorkoutList
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile)