import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import QuestionPoll from './QuestionPoll'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
// import NoMatch from './NoMatch'
import logo from '../logo.svg';

function NoMatch() {
  return <h2>404: No Match</h2>
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  // <div className="container"> instead of <div className="App-header">

  render() {
    {/*
      <Nav name="John Doe" avatarURL='https://avatars.io/twitter/johndoe'/>
    */}
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav name="Tyler McGinnis" avatarURL='https://avatars.io/twitter/tylermcginnis'/>
            {this.props.loading === true
              ? null
              : <div>
                  { /*
                    <img src={logo} className="App-logo" alt="logo" />
                  */ }
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' exact component={QuestionPoll} />
                    <Route path='/add' component={AddQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route component={NoMatch} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
