import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateExerciseList} from '../../ducks/exercise_reducer'

class ShowAddedExercises extends Component {
    constructor(props) {
    super(props)
    }
    removeExercise = async () => {
        console.log(1111)
        console.log(this.props.id)
        const {id} = this.props
        await axios.delete(`/auth/exercise/${id}`)
        // let res = await axios.get(`/auth/exercises/${id}`)
        // this.props.updateExerciseList(res.data)
    }
    
    

    handleRemoveButton = () => {
        this.removeExercise()
        this.props.getExercises()
    }
    render() {
        return (            
            <div className="ShowAddedExercisesPage">
                <button onClick={this.handleRemoveButton}>Remove</button>
                <div className="AddedExerciseName">
                    {this.props.name}
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return Object.assign({}, reduxState.auth_reducer, reduxState.exercise_reducer)

}
const mapDispatchToProps = {
    updateExerciseList
}




export default connect(mapStateToProps, mapDispatchToProps)(ShowAddedExercises)