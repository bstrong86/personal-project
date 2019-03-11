import React from 'react'

export default function Exercise(props) {console.log(props)
    const {name, sets, reps, weight} = props
    return (
        <div>
            <div>{name}</div>
            <div>{sets}</div>
            <div>{reps}</div>
            <div>{weight}</div>
        </div>
    )
}