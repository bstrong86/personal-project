import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateExerciseList} from '../../ducks/exercise_reducer'

class ShowAddedExercises extends Component {
    constructor(props) {
    super(props)
    }
    removeExercise = async () => {
        const {id} = this.props
        await axios.delete(`/auth/exercise/${id}`)
        let res = await axios.get(`/auth/exercises/${id}`)
        this.props.updateExerciseList(res.data)


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
const mapStateToProps = reduxState => {
    console.log(reduxState)
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

}
const mapDispatchToProps = {
    updateExerciseList
}




export default connect(mapStateToProps, mapDispatchToProps)(ShowAddedExercises)