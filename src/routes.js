import React from 'react'
import {Switch, Route} from 'react-router-dom'

import  Profile from './components/Profile/Profile'
import Auth from './components/Auth/Auth'
import ViewWorkout from './components/ViewWorkout/ViewWorkout';

export default (
    <Switch>
        <Route path = '/profile/workout' component = {ViewWorkout} />
        <Route path = '/profile' component = {Profile}></Route>
        <Route exact path = '/' component = {Auth}></Route>
        
    </Switch>
)