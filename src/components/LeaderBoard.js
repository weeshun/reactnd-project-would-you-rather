import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
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
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  const sortedKeys = Object.keys(users).sort((a, b) => (
      (users[b].questions.length + Object.keys(users[b].answers).length)
    - (users[a].questions.length + Object.keys(users[a].answers).length)
  ))

  return {
    users,
    sortedKeys
  }
}

export default connect(mapStateToProps)(LeaderBoard)
