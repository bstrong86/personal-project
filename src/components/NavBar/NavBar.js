import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/auth_reducer'
import {withRouter} from 'react-router-dom'

class NavBar extends Component {
    componentDidMount(){
        this.getUser()
    }
    getUser = async () => {
        const {user_id} = this.props
            if (!user_id) {
                try {
                    let res = await axios.get('/auth/current')
                    this.props.updateUser(res.data)
                }catch (err){
                    this.props.history.push('/')
                }
            }
    }
    goToProfile = () => {
        this.props.history.push('/profile')
    }
    logout = async () => {
        await axios.post('/auth/logout')
        this.props.clearUser()
        this.props.history.push('/')
    }
    render() {
        const {username, profile_pic} = this.props
        
        if(this.props.location.pathname !== '/' && this.props.location.pathname !=='/auth/register'){
        return (
            <div>
                <h3>{username}</h3>
                <img onClick={this.goToProfile} src={profile_pic} alt={username}/>
                <button onClick={this.logout}>Logout</button>
            </div>
        )} else {
            return (
                null
            )
        }
    }
}
const mapStateToProps = reduxState => {
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)
}
const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (NavBar))
