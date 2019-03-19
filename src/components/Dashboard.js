import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    showUnanswered: true
  }

  render() {
    //const whatToShow = this.state.showUnanswered ? "Unanswered" : "Answered"
    const selectedQuestions = this.state.showUnanswered
                            ? this.props.unanswered
                            : this.props.answered
    //
    //this.props.answered.map((id) =>
    return (
      <div>
        <h5>Showing {this.state.showUnanswered ? "Unanswered" : "Answered"} questions</h5>
        <ul className='dashboard-list'>
          {Object.keys(selectedQuestions).map((id) => (
            <li key={id}>
              {/*
                {this.props.questions[id].optionOne.text}
              */}
              {id}
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  const user = users[authedUser]
  console.log('user: ', user)
  //let selectedQuestions = {}
  let answered = {}
  let unanswered = {}
  //if (typeof user !== 'undefined') {  // or loading has completed
  if (typeof users[authedUser] !== 'undefined') {
    //const answeredQuestionIDs = user.questions
    // const answeredQuestionIDs = users[authedUser].questions
    // const unansweredQuestionIDs = Object.keys(questions).filter((id) => !answeredQuestionIDs.includes(id))
    const answeredIDs = users[authedUser].questions
    const unansweredIDs = Object.keys(questions).filter((id) => !answeredIDs.includes(id))
    // const selectedQuestionIDs = this.state.showUnanswered
    //       ? Object.keys(questions).filter((id) => !answeredQuestionIDs.includes(id))
    //       : users[authedUser].questions
    //answeredQuestions = Object.assign({}, )
    console.log("*** (1) ***")
    // console.log("user.id: ", user.id)
    console.log("answeredIDs: ", answeredIDs)
    console.log("unansweredIDs: ", unansweredIDs)
    // const obj1 = Object.assign({}, unansweredQuestionIDs)
    // console.log("obj1: ", obj1)
    // const obj2 = {...unansweredQuestionIDs}
    // console.log("obj2: ", obj2)
    //selectedQuestionIDs.forEach((id) => (selectedQuestions[id] = questions[id]))
    //console.log("selectedQuestions: ", selectedQuestions)
    answeredIDs.forEach((id) => (answered[id] = questions[id]))
    unansweredIDs.forEach((id) => (unanswered[id] = questions[id]))
    Object.keys(answered).sort((a, b) => answered[b].timestamp - answered[a].timestamp)
    Object.keys(unanswered).sort((a, b) => unanswered[b].timestamp - unanswered[a].timestamp)
    console.log("answered: ", answered)
    console.log("unanswered: ", unanswered)
  }

  // questionIds: Object.keys(questions)
  //   .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  // answered: {
  //   questionIds: Object.keys(answered)
  //     .sort((a, b) => answered[b].timestamp - answered[a].timestamp)
  // }
  // unanswered: {
  //   questionIds: Object.keys(unanswered)
  //     .sort((a, b) => unanswered[b].timestamp - unanswered[a].timestamp)
  // }

  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)
//export default connect()(Dashboard)
