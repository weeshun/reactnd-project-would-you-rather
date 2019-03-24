import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoMatch from './NoMatch'

class LeaderBoard extends Component {
  render() {
    if (this.props.authedUser === '' || this.props.authedUser === null) {

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
          <ul className='leader-board'>
            {sortedKeys.map((id) => (
              <li key={id}>
                <div>
                  <h3 >{users[id].name}</h3>
                  <img
                    src={users[id].avatarURL}
                    alt={`Avatar of ${users[id].name}`}
                    className='avatar'
                  />
                </div>

                <div>
                  <ul>
                  <li>Answered questions: {Object.keys(users[id].answers).length}</li>
                  <li>Created questions: {users[id].questions.length}</li>
                  </ul>
                </div>

                <div>
                  <h3>Score</h3>
                  <h3 className='center'>{users[id].questions.length + Object.keys(users[id].answers).length}</h3>
                </div>
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
