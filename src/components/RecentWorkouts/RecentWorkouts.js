import React from 'react'
import {Link} from 'react-router-dom'
import './RecentWorkouts.scss'

export default function RecentWorkouts(props) {
    const {username, workout_name, profile_pic} = props
    return (
        <div className="RecentWorkouts">                
            <img className="UserPic" src={profile_pic} alt={username} />
            <div className="Username">{username.toUpperCase()}</div>
            <div className="WorkoutName">{workout_name.toUpperCase()}</div>
                
        </div>
    )

}