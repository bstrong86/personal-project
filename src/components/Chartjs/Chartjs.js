import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Doughnut } from 'react-chartjs-2';

class Chartjs extends Component { 
    constructor(props){
        super(props)
    }
    
    render() {
        const {user_count, workout_count} = this.props
        const data = {
            labels: ["Users", "Workouts"],
            datasets: [
                {
                    backgroundColor: ['rgb(125, 24, 192)', 'rgb(9, 142, 204)'],
                    borderColor: '#000',
                    borderWidth: 3,
                    hoverBackgroundColor: ['rgb(224, 91, 191))', 'rgba(0,0,233,0.4)'],
                    data: [user_count, workout_count]
                },
                {
                    backgroundColor: ['rgb(125, 24, 192)', 'rgb(9, 142, 204)'],
                    borderColor: '#000',
                    borderWidth: 3,
                    hoverBackgroundColor: ['rgb(224, 91, 191)', 'rgb(245, 242, 80)'],
                    data: [user_count, workout_count]
                }
            ]
        }

        return(
            <div className="Chart">
           

                <Doughnut data={data} />
            </div>
        )
    }

    
}
const mapStateToProps = reduxState => {
    return {
        user_count:reduxState.auth_reducer.user_count,
        workout_count:reduxState.auth_reducer.workout_count

    }

}
const mapDispatchToProps = {
    
}




export default connect(mapStateToProps, mapDispatchToProps)(Chartjs)


    
    


  

