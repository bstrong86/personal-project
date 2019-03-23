import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser,clearWorkoutList} from '../../ducks/auth_reducer'
import {withRouter} from 'react-router-dom'
import '../NavBar/NavBar.scss'

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
        this.props.clearWorkoutList()
    }
    render() {
        const {username, profile_pic} = this.props
        
        if(this.props.location.pathname !== '/' && this.props.location.pathname !=='/auth/register'){
        return (
            <div className="NavBar">
                <img className="NavBarProfilePic" onClick={this.goToProfile} src={profile_pic} alt={username}/>
                <h3 className="NavBarUsername">{username}</h3>
                <button className="NavBarLogout" onClick={this.logout}>Logout</button>
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
    clearUser,
    clearWorkoutList
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (NavBar))
