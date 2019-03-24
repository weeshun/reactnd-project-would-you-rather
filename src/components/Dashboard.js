import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import Question from './Question'
// import NoMatch from './NoMatch'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  setQuestionType (e) {
    e.preventDefault()
    const showAnswered = (e.target.value === "answered") ? true : false
    this.setState(() => ({
      showAnswered: showAnswered
    }))
  }

  render() {
    // if (this.props.authedUser === '' || this.props.authedUser === null) {
    //
    //   return (
    //     <div>
    //       <Redirect to='/signin' />
    //     </div>
    //   )
    //
    // } else {

      const selectedQuestions = this.state.showAnswered
                              ? this.props.answered
                              : this.props.unanswered

      return (
        <div className='center'>
          <div className='tab'>
            <button type='button'
              value='unanswered'
              disabled={this.state.showAnswered === false}
              onClick={(e) => this.setQuestionType(e)}>
                Unanswered
            </button>

            <button type='button'
              value='answered'
              disabled={this.state.showAnswered === true}
              onClick={(e) => this.setQuestionType(e)}>
                Answered
            </button>
          </div>

          <h3>{this.state.showAnswered ? "Answered" : "Unanswered"} Questions</h3>

          <ul className='dashboard-list'>
            {Object.keys(selectedQuestions).map((id) => (
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
          </ul>
        </div>
      )

    // }
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  let answered = {}
  let unanswered = {}

  if (typeof users[authedUser] !== 'undefined') {

    const answeredIDs = Object.keys(users[authedUser].answers)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    const unansweredIDs = Object.keys(questions)
      .filter((id) => !answeredIDs.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    answeredIDs.forEach((id) => (answered[id] = questions[id]))
    unansweredIDs.forEach((id) => (unanswered[id] = questions[id]))

  }

  return {
    authedUser,
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)
