import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile'
import Auth from './components/Auth/Auth'
import AddWorkout from './components/AddWorkout/AddWorkout'


class App extends Component {
  render() {
    return (
      <div className="App">
      <Profile/>
      <Auth />
      <AddWorkout />
        
      </div>
    );
  }
}

export default App;
