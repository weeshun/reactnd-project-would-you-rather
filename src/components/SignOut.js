import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'

class SignOut extends Component {
  componentDidMount() {
    this.props.dispatch(unsetAuthedUser())
    this.props.history.push(`/login`)
  }

  render() {
    // this.props.dispatch(unsetAuthedUser())

    // const { userNames, avatarURLS } = this.props
    // console.log("userNames: ", userNames)
    // console.log("avatarURLS: ", avatarURLS)
    // for (let i=0; i < userNames.length; i++) {
    //   console.log(userNames[i])
    // }
    //{userNames.map((n) => (<option>{n}</option>)}
    return null
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

// export default connect(mapStateToProps)(SignOut)
// export default connect()(SignOut)
// export default withRouter(connect(mapStateToProps)(SignOut))
export default withRouter(connect()(SignOut))
