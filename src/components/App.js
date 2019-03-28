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
// import SignUp from './SignUp'
import SignOut from './SignOut'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    (this.props.loading !== true) && this.props.dispatch(handleInitialData())
  }

  render() {
      return (
        <BrowserRouter>
          <Fragment>
            <LoadingBar />
            {this.props.loading === true
              ? null
                : <div className="container">
                    <Nav
                      name={this.props.authedUserName}
                      avatarURL={this.props.authedUserAvatarURL}/>
                    <Switch>
                      <Route path='/' exact render={() => <Dashboard />} />
                      <Route path='/questions/:id' component={QuestionPoll} />
                      <Route path='/add' component={AddQuestion} />
                      <Route path='/leaderboard' component={LeaderBoard} />
                      <Route path='/signout' component={SignOut} />
                      <Route render={() => <NoMatch />} />
                    </Switch>
                  </div>
            }
          </Fragment>
        </BrowserRouter>
      )
  }
}

function mapStateToProps ({ authedUser, users }) {
  let authedUserName = ''
  let authedUserAvatarURL = ''
  if (authedUser !== null && authedUser !== '') {
    authedUserName = users[authedUser].name
    authedUserAvatarURL = users[authedUser].avatarURL
  }
  // loading: authedUser === null,
  return {
    loading: users === null,
    authedUser,
    authedUserName,
    authedUserAvatarURL
  }
}

export default connect(mapStateToProps)(App)
