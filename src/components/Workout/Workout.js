import React from 'react'
import {Link} from 'react-router-dom'

export default function Workout(props) {
    const {name, id} = props
    return (
        <div className="WorkoutListItem">
            <Link to = {`/profile/viewWorkout/${id}`}>
                <div>{name}</div>
                
            </Link>
            
        </div>
    )
}