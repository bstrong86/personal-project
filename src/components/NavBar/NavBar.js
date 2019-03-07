import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

function NavBar(props){
    console.log(props)
    const{username, profile_pic} = props
    if(props.location.pathname !=='/') {
        return(
            <div>Nav</div>
        )
    } else {
        return (
            null
        )
    }
}

function mapStateToProps(reduxState){
    return {
        username: reduxState.username,
        profile_pic: reduxState.profile_pic
    }
}

export default withRouter(connect(mapStateToProps)(NavBar))