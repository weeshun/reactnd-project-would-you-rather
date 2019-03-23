import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { handleUnsetAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import QuestionPoll from './QuestionPoll'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import SignIn from './SignIn'
import SignOut from './SignOut'
import NoMatch from './NoMatch'
// import logo from '../logo.svg';

// function NoMatch() {
//   return <h2>404: Page Not Found</h2>
// }

// class NoMatch extends Component {
//   render() {
//     return (
//       <div className='question'>
//         <div className='question-info'>
//           <h5>Error 404: Page Not Found</h5>
//         </div>
//       </div>
//     )
//   }
// }

function handleDashBoard (authedUser) {
  // console.log("*** handleDashBoard ***")
  // console.log('authedUser: ', authedUser)
  // // console.log('this.props: ', this.props)
  // console.log("*** handleDashBoard DONE ***")
  return (
    (authedUser !== '' && authedUser !== null) ? <Dashboard /> : ''
  )
}

class App extends Component {
  //const { dispatch } = this.props
  componentDidMount() {
    (this.props.loading !== true) && this.props.dispatch(handleInitialData())
  }

  signOut () {
    console.log("*** signout ***")
    handleUnsetAuthedUser()
    return null
  }

  // <div className="container"> instead of <div className="App-header">

  render() {
    {/*
      <Nav name="John Doe" avatarURL='https://avatars.io/twitter/johndoe'/>
    */}
    console.log("*** APP ***")
    console.log("authedUser: ", this.props.authedUser)

    // <Route path='/logout' component={this.signOut} />
    // ? <Route path='/login' component={SignIn} />
    // <Route path='/login' component={SignIn} />

    // return (
    //   <BrowserRouter>
    //     <Fragment>
    //       <LoadingBar />
    //       {this.props.loading === true
    //         ? null
    //         : (this.props.authedUser === '' || this.props.authedUser === null)
    //           ? <SignIn />
    //           : <div className="container">
    //               <Nav
    //                 name={this.props.authedUserName}
    //                 avatarURL={this.props.authedUserAvatarURL}/>
    //               <div>
    //                 { /*
    //                   <img src={logo} className="App-logo" alt="logo" />
    //                   <Route path='/' exact component={Dashboard} />
    //                   <Route path='/questions/:id' exact component={QuestionPoll} />
    //                   <Route path='/' exact component={handleDashBoard(this.props.authedUser)} />
    //                 */ }
    //                 <Switch>
    //                   <Route path='/' exact component={Dashboard} />
    //                   <Route path='/questions/:id' exact component={QuestionPoll} />
    //                   <Route path='/add' exact component={AddQuestion} />
    //                   <Route path='/leaderboard' exact component={LeaderBoard} />
    //                   <Route path='/logout' exact component={SignOut} />
    //                   <Route component={NoMatch} />
    //                 </Switch>
    //               </div>
    //             </div>
    //       }
    //     </Fragment>
    //   </BrowserRouter>
    // );

      // return (
      //   <BrowserRouter>
      //     <Fragment>
      //       <LoadingBar />
      //       {this.props.loading === true
      //         ? null
      //         : <div className="container">
      //               <Nav
      //                 name={this.props.authedUserName}
      //                 avatarURL={this.props.authedUserAvatarURL}/>
      //               <div>
      //                 { /*
      //                   <img src={logo} className="App-logo" alt="logo" />
      //                   <Route path='/' exact component={Dashboard} />
      //                   <Route path='/questions/:id' exact component={QuestionPoll} />
      //                   <Route path='/' exact component={handleDashBoard(this.props.authedUser)} />
      //                 */ }
      //
      //                   <Route path='/login' exact component={SignIn} />
      //                   <Route path='/' exact component={Dashboard} />
      //                   <Route path='/questions/:id' exact component={QuestionPoll} />
      //                   <Route path='/add' exact component={AddQuestion} />
      //                   <Route path='/leaderboard' exact component={LeaderBoard} />
      //                   <Route path='/logout' exact component={SignOut} />
      //
      //
      //               </div>
      //             </div>
      //       }
      //     </Fragment>
      //   </BrowserRouter>
      // );

      // ? <Route path='/login' component={SignIn} />
      return (
        <BrowserRouter>
          <Fragment>
            <LoadingBar />
            {this.props.loading === true
              ? null
              : (this.props.authedUser === '' || this.props.authedUser === null)
                ? <SignIn />
                : <div className="container">
                    <Nav
                      name={this.props.authedUserName}
                      avatarURL={this.props.authedUserAvatarURL}/>
                    <div>
                      { /*
                        <img src={logo} className="App-logo" alt="logo" />
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/questions/:id' exact component={QuestionPoll} />
                        <Route path='/' exact component={handleDashBoard(this.props.authedUser)} />
                      */ }

                        <Route path='/' exact component={Dashboard} />
                        <Route path='/questions/:id' exact component={QuestionPoll} />
                        <Route path='/add' exact component={AddQuestion} />
                        <Route path='/leaderboard' exact component={LeaderBoard} />
                        <Route path='/logout' exact component={SignOut} />


                    </div>
                  </div>
            }
          </Fragment>
        </BrowserRouter>
      );

  }
}

// function mapStateToProps ({ authedUser }) {
//   return {
//     loading: authedUser === null
//   }
// }

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
