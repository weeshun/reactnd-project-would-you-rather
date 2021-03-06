import React, { Component } from 'react'
// import { withRouter, Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'

class SignOut extends Component {
  componentDidMount() {
    this.props.dispatch(unsetAuthedUser())
    // this.props.history.push('/signin')
    // this.props.history.push('/')
  }

  render() {
    return <Redirect to='/' />
  }
}

// function mapStateToProps ({ authedUser }) {
//   return {
//     authedUser
//   }
// }

export default connect()(SignOut)
// export default withRouter(connect(mapStateToProps)(SignOut))
// export default withRouter(connect()(SignOut))
