import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    return (
      <div>
        <ul className='dashboard-list'>

        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  // sort
  return {
    userNames: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login)
