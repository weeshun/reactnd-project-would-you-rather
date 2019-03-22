import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  handleChange = (e) => {
    e.preventDefault()
    const id = e.target.value
    console.log("selected user: ", id)

    this.props.dispatch(setAuthedUser(id))

    this.props.history.push(`/`)
    //<Redirect to='/' />
  }

  render() {
    const { users } = this.props
    const userIDs = Object.keys(users).sort()

    console.log("*** SIGNIN ***")
    console.log(this.props)
    console.log("users: ", users)
    console.log("userIDs: ", userIDs)
    // const { userNames, avatarURLS } = this.props
    // console.log("userNames: ", userNames)
    // console.log("avatarURLS: ", avatarURLS)
    // for (let i=0; i < userNames.length; i++) {
    //   console.log(userNames[i])
    // }
    //{userNames.map((n) => (<option>{n}</option>)}
    return (
      <div>
        <h1>Welcome to the Would You Rather App</h1>

        <h3>Please sign in to continue</h3>

        <h2>SIGN IN</h2>

        <select className='dashboard-list' onChange={this.handleChange}>
          <option value='select'>Select Your Account</option>
          {userIDs.map((id) => (
            <option value={id} key={id} defaultChecked={false}>`url({users[id].avatarURL})`: {users[id].name}</option>
          ))}
        </select>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  const userIDs = Object.keys(users).sort((a, b) => users[a].name - users[b].name)
  const userNames = userIDs.map((id) => users[id].name)
  const avatarURLs = userIDs.map((id) => users[id].avatar)
  // userNames,
  // avatarURLs
  return {
    users
  }
}

// export default connect(mapStateToProps)(SignIn)
// export default connect()(SignIn)
export default withRouter(connect(mapStateToProps)(SignIn))
