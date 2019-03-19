import React from 'react'
import {Link} from 'react-router-dom'

export default function RecentWorkouts(props) {
    const {username, workout_name, profile_pic, workout_id} = props
    return (
        <div className="RecentWorkout">
            {/* <Link to = {`/profile/viewWorkout/`}> */}
                <div>
                    <img className="UserPic" src={profile_pic} alt={username} />
                    <div className="Username">{username}</div>
                    <div classname="WorkoutName">{workout_name}</div>
                </div>
            {/* </Link> */}
        </div>
    )

}