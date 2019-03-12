import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <header className="App-header">
            { /*
              <img src={logo} className="App-logo" alt="logo" />
            */ }
            <p>
              Hello World!
            </p>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App)
