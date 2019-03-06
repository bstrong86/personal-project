import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser, clearUser} from '../../ducks/reducer'

class Profile extends Component {
    componentDidMount(){
        this.getUser()
    }
    getUser = async () => {
        const {id} = this.props
            if (!id) {
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
        return (
            <div>
                <h3>{username}</h3>
                <img src={profile_pic} alt={username}/>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return reduxState
}
const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default connect( mapStateToProps, mapDispatchToProps) (Profile)