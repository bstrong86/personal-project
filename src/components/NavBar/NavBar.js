import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/reducer'
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
    logout = async () => {
        await axios.post('/auth/logout')
        this.props.clearUser()
        this.props.history.push('/')
    }
    render() {
        const {username, profile_pic} = this.props
        
        if(this.props.location.pathname !== '/'){
        return (
            <div>
                <h3>{username}</h3>
                <img src={profile_pic} alt={username}/>
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
