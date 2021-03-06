import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
// import SignUp from './SignUp'

class SignIn extends Component {
  handleChange = (e) => {
    e.preventDefault()
    const id = e.target.value
    // console.log("selected user: ", id)

    this.props.dispatch(setAuthedUser(id))
  }

  render() {
    const { users } = this.props
    const userIDs = Object.keys(users).sort()

    return (
      <div className='center'>
        <h1>Welcome to the Would You Rather App</h1>

        <h3>Please sign in to continue</h3>

        <div className='signin'>
          <h2>Sign In</h2>

          <select className='dashboard-list' onChange={this.handleChange}>
            <option value='select'>Select Your Account</option>
            {userIDs.map((id) => (
              <option value={id} key={id} defaultChecked={false}>
                {users[id].name}
              </option>
            ))}
          </select>
        </div>

        {/*
          <h4>Or</h4>

          <div className='signin'>
            <p>If you don't have an account...</p>

            <h2>Sign Up</h2>
          </div>
        */}

      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(SignIn)
// export default connect()(SignIn)
// export default withRouter(connect(mapStateToProps)(SignIn))
