import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/auth_reducer'
import RecentWorkouts from '../RecentWorkouts/RecentWorkouts';



class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUploading: false,
            username: '',
            password: '',
            profile_pic:'',
            recentWorkouts: []
        }
    }

    componentDidMount() {
        this.checkUser()
        this.getRecentWorkouts()
    }
    getRecentWorkouts = async () => {
        try{
            let res = await axios.get('/auth/workouts')
            this.setState({
                recentWorkouts: res.data
            })

        } catch (err) {
            console.log(err)
        }
    }

    checkUser = async () => {
        const {id} = this.props
        if (!id) {
            try {
                let res = await axios.get('/auth/current')
                this.props.updateUser(res.data)
                this.props.history.push('/profile')
            } catch (err) {}
        } else {
            this.props.history.push('/profile')
        }
        }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }
    
    login = async () => {
        let user = {
            username: this.state.username,
            password: this.state.password,
        }
        try {
            let res = await axios.post('/auth/login', user)
            this.props.updateUser(res.data)
            this.props.history.push('/profile')
        } catch (err) {
            alert ('wrong username or password')
        }
    }
    
      handleRegisterButton = () => {
          this.props.history.push('/auth/register')
      }



    render() {
       const mappedRecentWorkouts = this.state.recentWorkouts.map((workout) => {
            return (
                <div className="RecentWorkoutBox">
                <RecentWorkouts
                    key={workout.workout_id}
                    username={workout.username}
                    workout_name={workout.workout_name}
                    profile_pic={workout.profile_pic}
                />
              
                </div>

            )
        })
        const {username, password} = this.state
        return (
            <div className="LoginPage">
            <header> <h1 className="LoginHeader">Strong Workouts</h1></header>
                <div className="LoginSection">  
                    <div className="LoginInputs">             
                        <input value={username} placeholder='Username' maxLength={12}onChange={e => this.handleChange("username", e.target.value)} />
                        <input type="password" placeholder='Password' value={password} onChange={e => this.handleChange("password", e.target.value)} />
                    </div>
                    <div className="LoginButtons">
                        <button onClick={this.login} >Login</button>
                        <button onClick={this.handleRegisterButton}>Register</button>
                    </div>
                <div className="QuoteBox">quote box</div>
                </div>
                    <section className="WorkoutList">
                        <h3>Newest Workouts</h3>
                        {mappedRecentWorkouts}
                    </section>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    
        return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

    
}
const mapDispatchToProps = {
    updateUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)