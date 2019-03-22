import React, { Component } from 'react'
import { handleAnswerQuestion } from '../actions/shared'
import { connect } from 'react-redux'

class QuestionPoll extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, authedUser, id, answered, name, avatarURL, question } = this.props

    console.log("this.props: ", this.props)
    console.log("answer: ", answer)

    // A method found accidentally!
    const answer = this.input.checked ? 'optionOne' : 'optionTwo'
    console.log("**********")
    console.log("this.input.value: ", this.input.checked)
    console.log("id: ", id)
    console.log("answer: ", answer)


    dispatch(handleAnswerQuestion(id, answer))

    // const { optionOneText, optionTwoText } = this.state
    // const { dispatch } = this.props
    //
    // dispatch(handleAddQuestion(optionOneText, optionTwoText))
    //
    // this.setState(() => ({
    //   optionOneText: '',
    //   optionTwoText: '',
    //   toHome: true
    // }))
  }

  showAnswered (answer, name, avatarURL, question) {
    const totalVotes = question.optionOne.votes.length
                     + question.optionTwo.votes.length

    const percentOne = question.optionOne.votes.length * 100. / totalVotes
    const percentTwo = question.optionTwo.votes.length * 100. / totalVotes

    return (
      <div>
        <p>Asked by {name}</p>

        <p>Results:</p>
        <p>{avatarURL}</p>
        <ul>
        <li>Would you rather {question.optionOne.text}?
          <p>{percentOne}%</p>
          <p>{question.optionOne.votes.length} out of {totalVotes} votes</p>
          <p>{answer === 'optionOne' ? 'Your vote' : ''}</p>
        </li>

        <li>Would you rather {question.optionTwo.text}?
          <p>{percentTwo}%</p>
          <p>{question.optionTwo.votes.length} out of {totalVotes} votes</p>
          <p>{answer === 'optionTwo' ? 'Your vote' : ''}</p>
        </li>

        </ul>

        <p>Your vote: {answer}</p>
      </div>
    )
  }

  showUnanswered (name, avatarURL, question) {
    //checked={this.state.selectedOption === 'optionOne'}
    //checked={this.state.selectedOption === 'optionTwo'}
    //onChange={this.handleChange}
    //value='optionOne'
    //value='optionTwo'
    //ref={(input) => this.optionTwo = input}
    return (
      <div className='container'>
        <h5>{name} asks</h5>

        <p>{avatarURL}</p>
        <h3>Would You Rather...</h3>

        <form className='new-question' onSubmit={this.handleSubmit}>
          <div>
            <label>
              <input type='radio'
                name='questionPoll'
                checked={true}
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
    // const { authedUser, id, answered, answer, name, optionOne, optionTwo } = this.props
    const { authedUser, id, answered, answer, name, avatarURL, question } = this.props
    {/*
      <div>
        <p>PollInfo: {id}</p>
        <p>Answered: {answered ? "Yes" : "No"}</p>
        <p>My Answer: {answer}</p>
      </div>

      <div>
        <p>PollInfo: {id}</p>
        <p>Answered: {answered ? "Yes" : "No"}</p>
      </div>
    */}

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

function mapStateToProps ({ authedUser, questions, users }, props) {
  // 2nd arg for those passed as props to TweetPage component
  // App.js: <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}} />
  const { id } = props.match.params
  const answered = Object.keys(users[authedUser].answers).includes(id)
  const answer = (answered) ? users[authedUser].answers[id] : null
  const name = users[questions[id].author].name
  const avatarURL = users[questions[id].author].avatarURL
  // const optionOne = questions[id].optionOne
  // const optionTwo = questions[id].optionTwoText
  const question = questions[id]
  // console.log("answered? ", answered)
  // console.log("answer? ", answer)

  // authedUser,
  // id,
  // answered,
  // answer,
  // name,
  // optionOne,
  // optionTwo
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
// export default connect()(QuestionPoll)
