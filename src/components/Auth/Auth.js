import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/auth_reducer'
import RecentWorkouts from '../RecentWorkouts/RecentWorkouts';
import S3FileUpload from 'react-s3'


class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
    register = async () => {
        let user = {
            username:this.state.username,
            password:this.state.password,
            profile_pic: "https://robohash.org/"+this.state.username 
        }
        try {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data)
            this.props.history.push("/profile")
        }catch (err) {
            alert("choose different username")
        }
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



    render() {
       const mappedRecentWorkouts = this.state.recentWorkouts.map((workout) => {
            return (
                <RecentWorkouts
                    key={workout.workout_id}
                    username={workout.username}
                    workout_name={workout.workout_name}
                    profile_pic={workout.profile_pic}
                />

            )
        })
        const {username, password} = this.state
        return (
            <div>
                <input value={username} placeholder='Username' onChange={e => this.handleChange("username", e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => this.handleChange("password", e.target.value)} />
                <button onClick={this.login} >Login</button>
                <button onClick={this.register}>Register</button>
                <section>
                    List of Recent Workouts
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