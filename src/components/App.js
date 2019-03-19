import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'
import logo from '../logo.svg';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    {/*
      <Nav name="John Doe" avatarURL='https://avatars.io/twitter/johndoe'/>
    */}
    return (
      <BrowserRouter>
        <div className="App">
          <Nav name="Tyler McGinnis" avatarURL='https://avatars.io/twitter/tylermcginnis'/>
          <header className="App-header">
            { /*
              <img src={logo} className="App-logo" alt="logo" />
            */ }
            <Dashboard />
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App)
