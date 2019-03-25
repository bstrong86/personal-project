import React from 'react'
import {Link} from 'react-router-dom'
import './Workout.scss'

export default function Workout(props) {
    const {name, id} = props
    return (
        <div className="WorkoutListItem">
            <Link to = {`/profile/viewWorkout/${id}`}>
                <div className="WorkoutListName">{name}</div>
                
            </Link>
            
        </div>
    )
}