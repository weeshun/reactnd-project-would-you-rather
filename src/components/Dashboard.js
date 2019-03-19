import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    showUnanswered: true
  }

  render() {
    return (
      <div>
        <ul className='dashboard-list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              {/*
                {this.store.questions[id].optionOne.text}
                {id}
              */}
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
  //const user = users.authedUser
  console.log('user: ', user)
  //console.log('user.questions: ', user[questions])
  //console.log('user.questions: ', user.questions)
  //console.log('keys: ', Object.keys(user))
  //console.log('user.id: ', user.id)
  //const answeredQuestionIDs = users[authedUser].questions
  // const answeredQuestionIDs = user.questions
  // const unansweredQuestionIDs = Object.keys(questions).filter((id) => !answeredQuestionIDs.includes(id))
  // console.log('*** authedUser', authedUser)
  // console.log('answeredQuestionIDs:   ', answeredQuestionIDs)
  // console.log('unansweredQuestionIDs: ', unansweredQuestionIDs)
  return {
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
