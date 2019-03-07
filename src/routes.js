import React from 'react'
import {Switch, Route} from 'react-router-dom'

import  Profile from './components/Profile/Profile'
import Auth from './components/Auth/Auth'

export default (
    <Switch>
        <Route path = '/profile' component = {Profile}></Route>
        <Route exact path = '/' component = {Auth}></Route>
        
    </Switch>
)