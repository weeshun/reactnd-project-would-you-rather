import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionPoll extends Component {
  /*
    <Question id={id} />
    <NewQuestion id={id} />
    {replies.length !== 0 && <h3 className='center'>Replies</h3>}
    <ul>
      {replies.map((replyId) => (
        <li key={replyId}>
          <Question id={replyId} />
        </li>
      ))}
    </ul>
  */
  showAnswered (answer, name, question) {
    const totalVotes = question.optionOne.votes.length
                     + question.optionTwo.votes.length
    const percentOne = question.optionOne.votes.length * 100. / totalVotes
    const percentTwo = question.optionTwo.votes.length * 100. / totalVotes
    return (
      <div>
        <p>Asked by: {name}</p>
        <p>Results</p>
        <p>optionOne text: {question.optionOne.text}</p>
        <p>optionOne votes: {question.optionOne.votes.length} out of {totalVotes} votes or {percentOne}%</p>
        <p>optionTwo text: {question.optionTwo.text}</p>
        <p>optionTwo votes: {question.optionTwo.votes.length} out of {totalVotes} votes or {percentTwo}%</p>
        <p>My answer: {answer}</p>
      </div>
    )
  }

  showUnanswered (name, question) {
    return (
      <div>
        <p>{name} asks</p>
        <p>Would You Rather...</p>
        <p>optionOne text: {question.optionOne.text}</p>
        <p>optionTwo text: {question.optionTwo.text}</p>
      </div>
    )
  }

  render() {
    // const { authedUser, id, answered, answer, name, optionOne, optionTwo } = this.props
    const { authedUser, id, answered, answer, name, question } = this.props
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
      ? this.showAnswered(answer, name, question)
      : this.showUnanswered(name, question)
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
    question
  }
}

export default connect(mapStateToProps)(QuestionPoll)
// export default connect()(QuestionPoll)
