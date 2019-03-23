import React, { Component } from 'react'
import { connect } from 'react-redux'

    import NoMatch from './NoMatch'

class LeaderBoard extends Component {
  render() {
    if (this.props.authedUser === '' || this.props.authedUser === null) {
      // return <h3>Sign in first</h3>
      // this.warnUser()
      return (
        <div>
          <h2>Sign in first</h2>
          <NoMatch />
        </div>
      )
    } else {
      const { users, sortedKeys } = this.props
      return (
        <div>
          <ul className='dashboard-list'>
            {sortedKeys.map((id) => (
              <li key={id}>
                {users[id].avatarURL}
                {users[id].name}:
                {users[id].questions.length} questions
                {Object.keys(users[id].answers).length} answers
                Score: {users[id].questions.length + Object.keys(users[id].answers).length}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  const sortedKeys = Object.keys(users).sort((a, b) => (
      (users[b].questions.length + Object.keys(users[b].answers).length)
    - (users[a].questions.length + Object.keys(users[a].answers).length)
  ))

  return {
    users,
    sortedKeys,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)
