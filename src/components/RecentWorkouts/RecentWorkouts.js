import React from 'react'
import {Link} from 'react-router-dom'

export default function RecentWorkouts(props) {
    const {username, workout_name, profile_pic, workout_id} = props
    return (
        <div>
            {/* <Link to = {`/profile/viewWorkout/`}> */}
                <div>
                    <img src={profile_pic} alt={username} />
                    <div>{username}</div>
                    <div>{workout_name}</div>
                </div>
            {/* </Link> */}
        </div>
    )

}