import React, { Component } from 'react'
import { handleAnswerQuestion } from '../actions/shared'
import { connect } from 'react-redux'
import NoMatch from './NoMatch'
// import ProgressBar from 'react-bootstrap/ProgressBar'

class QuestionPoll extends Component {
  // ProgressBar from:
  //  https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
  ProgressBar = (percentage) => {
    return (
      <div className='progress-bar'>
        <div className='filler' style={{ width: `${percentage}%` }} />
      </div>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, id } = this.props

    // A method (.checked property) found accidentally!
    const answer = this.input.checked ? 'optionOne' : 'optionTwo'

    dispatch(handleAnswerQuestion(id, answer))
  }

  showAnswered (answer, name, avatarURL, question) {
    // Don't have to worry about the denotimator being zero here since you can
    // only see this poll data when at least one user (that is, you) has voted.

    const totalVotes = question.optionOne.votes.length
                     + question.optionTwo.votes.length

    const percentOne = (question.optionOne.votes.length * 100. / totalVotes)
                        .toFixed(1)
    const percentTwo = (question.optionTwo.votes.length * 100. / totalVotes)
                        .toFixed(1)

    return (
      <div>
        <h2>Asked by {name}</h2>

        <div>
          <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
        </div>

        <h2>Results:</h2>

        <ul className='poll'>

        <li><strong>Would you rather {question.optionOne.text}?</strong>
          {answer === 'optionOne' && <span className='poll-your-vote'>Your vote</span>}
          {this.ProgressBar(percentOne)}
          {/*
          <ProgressBar now={percentOne} label={`${percentOne}%`} />
          */}

          <p>{question.optionOne.votes.length} out of {totalVotes} votes ({percentOne}%)</p>
        </li>

        <li><strong>Would you rather {question.optionTwo.text}?</strong>
          {answer === 'optionTwo' && <span className='poll-your-vote'>Your vote</span>}
          {this.ProgressBar(percentTwo)}
          {/*
          <ProgressBar now={percentOne} label={`${percentOne}%`} />
          */}

          <p>{question.optionTwo.votes.length} out of {totalVotes} votes ({percentTwo}%)</p>
        </li>

        </ul>

      </div>
    )
  }

  showUnanswered (name, avatarURL, question) {
    return (
      <div className='question-unanswered'>
        <div>
          <h3>{name} asks</h3>
          <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
        </div>

        <div>

          <h3>Would You Rather...</h3>

          <form onSubmit={this.handleSubmit}>

            <div>
              <label>
                <input type='radio'
                  name='questionPoll'
                  defaultChecked
                  ref={(input) => this.input = input}
                />
                {question.optionOne.text}
              </label>
            </div>

            <div className='radio'>
              <label>
                <input type='radio'
                  name='questionPoll'
                />
                {question.optionTwo.text}
              </label>
            </div>

            <button className='btn'
              type='submit'>
                Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const { authedUser, answered, answer, name, avatarURL, question } = this.props

    return (
      (authedUser === '' || authedUser === null || question === null)
      ? <NoMatch />
      : answered
        ? this.showAnswered(answer, name, avatarURL, question)
        : this.showUnanswered(name, avatarURL, question)
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  let question = null
  let answered = null
  let answer = null
  let name = null
  let avatarURL = null

  if (Object.keys(questions).includes(id)) {
    question = questions[id]
    name = users[questions[id].author].name
    avatarURL = users[questions[id].author].avatarURL
    if (authedUser !== null && authedUser !== '' && Object.keys(users).includes(authedUser)) {
      answered = Object.keys(users[authedUser].answers).includes(id)
      answer = (answered) ? users[authedUser].answers[id] : null
    }
  }

  // console.log("*** QuestionPoll ***")
  // console.log('id: ', id)
  // console.log('question: ', question)

  return {
    authedUser,
    id,
    answered,
    answer,
    name,
    avatarURL,
    question
  }
}

export default connect(mapStateToProps)(QuestionPoll)
