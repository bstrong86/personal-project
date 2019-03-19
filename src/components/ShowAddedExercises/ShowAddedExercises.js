import React, {Component} from 'react'
import axios from 'axios'

class ShowAddedExercises extends Component {
    constructor(props) {
    super(props)
    }
    removeExercise = () => {
        const {id} = this.props
        axios.delete(`/auth/exercise/${id}`)
    }
    render() {
        return (
            
            <div>
                <button onClick={this.removeExercise}>Remove</button>
                {this.props.name}
            </div>
        )
    }
}

export default (ShowAddedExercises)