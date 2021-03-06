import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getShorterStr } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class Question extends Component {
  showInfo = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }

  render() {
    const { authedUser, user, question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const { id } = question

    const answered =  question.optionOne.votes.includes(authedUser)
                   || question.optionTwo.votes.includes(authedUser)
    const buttonName = answered ? "VIEW POLL" : "VOTE"
    const shortAnswerSample = getShorterStr(question.optionOne.text)

    return (
      <div className='question'>
        <div>
          <h2 className='center'>{user.name} asks:</h2>
          <img
            src={user.avatarURL}
            alt={`Avatar of ${user.name}`}
            className='avatar'
          />
        </div>
        <div>
          <h3>Would you rather</h3>
          <div className='short-sample-answer'>...{shortAnswerSample}...</div>
          <button className='btn'
            onClick={(e) => this.showInfo(e, id)}>
              {buttonName}
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const user = users[question.author]

  return {
    authedUser,
    user,
    question
  }
}

export default withRouter(connect(mapStateToProps)(Question))
// export default connect(mapStateToProps)(Question)
