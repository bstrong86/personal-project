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
    render() {
        return (
            <div>Profile</div>
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