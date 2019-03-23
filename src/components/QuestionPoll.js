import React, { Component } from 'react'
import { handleAnswerQuestion } from '../actions/shared'
import { connect } from 'react-redux'
import NoMatch from './NoMatch'
// import ProgressBar from 'react-bootstrap/ProgressBar'

class QuestionPoll extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, id } = this.props

    // A method (.checked property) found accidentally!
    const answer = this.input.checked ? 'optionOne' : 'optionTwo'

    dispatch(handleAnswerQuestion(id, answer))
  }

  showAnswered (answer, name, avatarURL, question) {
    const totalVotes = question.optionOne.votes.length
                     + question.optionTwo.votes.length

    const percentOne = (totalVotes > 0)
                     ? (question.optionOne.votes.length * 100. / totalVotes)
                        .toFixed(1)
                     : null
    const percentTwo = (totalVotes > 0)
                     ? (question.optionTwo.votes.length * 100. / totalVotes)
                        .toFixed(1)
                     : null

    return (
      <div>
        <h2>Asked by {name}</h2>

        <div>
          <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
        </div>

        <h2>Results:</h2>
        <ul>
        <li><strong>Would you rather {question.optionOne.text}?</strong>
          <p>{question.optionOne.votes.length} out of {totalVotes} votes
          (percentOne !== null) ? ({percentOne}%) : ''</p>
          <p>{answer === 'optionOne' ? 'Your vote' : ''}</p>
        </li>

        {/*
        <ProgressBar now={percentOne} label={`${percentOne}%`} />
        */}

        <li><strong>Would you rather {question.optionTwo.text}?</strong>
          (percentTwo !== null) && <p>{percentTwo}%</p>
          <p>{question.optionTwo.votes.length} out of {totalVotes} votes</p>
          <p>{answer === 'optionTwo' ? 'Your vote' : ''}</p>
        </li>

        {/*
        <ProgressBar now={percentTwo} label={`${percentTwo}%`} />
        */}

        </ul>

        <p>Your vote: {answer}</p>
      </div>
    )
  }

  showUnanswered (name, avatarURL, question) {
    return (
      <div className='container'>
        <h5>{name} asks</h5>

        <div>
          <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
        </div>

        <h3>Would You Rather...</h3>

        <form className='new-question' onSubmit={this.handleSubmit}>
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
    )
  }

  render() {
    if (this.props.authedUser === '' || this.props.authedUser === null) {

      return (
        <div>
          <h2>Sign in first</h2>
          <NoMatch />
        </div>
      )

    } else if (this.props.question === null) {

      return (
        <div>
        <NoMatch />
        </div>
      )

    } else {

      const { authedUser, answered, answer, name, avatarURL, question } = this.props
      return (
        <div>
        {answered
        ? this.showAnswered(answer, name, avatarURL, question)
        : this.showUnanswered(name, avatarURL, question)
        }
        </div>
      )

    }
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  console.log("*** QuestionPOll mapStateToProps ***")
  console.log('id: ', id)
  let question = null
  let answered = null
  let answer = null
  let name = null
  let avatarURL = null
  if (Object.keys(questions).includes(id)) {
    question = questions[id]
    answered = Object.keys(users[authedUser].answers).includes(id)
    answer = (answered) ? users[authedUser].answers[id] : null
    name = users[questions[id].author].name
    avatarURL = users[questions[id].author].avatarURL
  }

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
