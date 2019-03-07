import React, { Component } from 'react';
import './App.css';
import { HashRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'
import routes from './routes'
import NavBar from './components/NavBar/NavBar'


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <HashRouter>
          <div className="App">
            <NavBar location={this.props.location} />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
