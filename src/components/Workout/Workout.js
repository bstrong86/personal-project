import React from 'react'
import {Link} from 'react-router-dom'

export default function Workout(props) {
    const {name, id} = props
    return (
        <div>
            <Link to="/auth/profile/workout">
            <div>{name}</div>
            </Link>
        </div>
    )
}