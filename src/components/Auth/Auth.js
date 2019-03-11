import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/auth_reducer'


class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            profile_pic:''
        }
    }

    componentDidMount() {
        this.checkUser()
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
        const {username, password, profile_pic} = this.state
        return (
            <div>
                <input value={username} placeholder='Username' onChange={e => this.handleChange("username", e.target.value)} />
                <input type="password" value={password} onChange={e => this.handleChange("password", e.target.value)} />
                <button onClick={this.login} >Login</button>
                <button onClick={this.register}>Register</button>
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