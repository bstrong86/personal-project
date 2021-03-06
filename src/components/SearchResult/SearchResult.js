import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchResults(props){
    const {name, id} = props   
    return (        
        <div className="SearchWorkoutListItem">
            <Link to = {`/profile/viewWorkout/${id}`}>
                <div>{name}</div>
            </Link>
        </div>
    )

}