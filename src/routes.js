import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CreateWorkout from './components/createWorkout/CreateWorkout'
import  Profile from './components/Profile/Profile'
import Auth from './components/Auth/Auth'
import ViewWorkout from './components/ViewWorkout/ViewWorkout';
import addExercise from './components/AddExercise/addExercise';
import Register from './components/Register/Register'
export default (
    <Switch>
        <Route path = '/profile/addexercise/:id' component = {addExercise}/>
        <Route path = '/profile/create' component = {CreateWorkout} />
        <Route path = '/profile/viewWorkout/:id' component = {ViewWorkout} />
        <Route path = '/profile' component = {Profile}></Route>
        <Route exact path = '/' component = {Auth}></Route>
        <Route path = '/auth/register' component = {Register}></Route>
        
        
    </Switch>
)