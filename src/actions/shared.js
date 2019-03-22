import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

//const AUTHED_ID = 'johndoe'
const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())

    return getInitialData()
      .then(( { users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question   // formattedQuestion
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({    // { optionOneText, optionTwoText, author }
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {  // actually, formattedQuestion (see _saveQuestion)
        dispatch(addQuestion(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}

function answerQuestion (qid, authedUser, answer) {
  return {
    type: ANSWER_QUESTION,
    qid,               // question id
    authedUser,        // authedUser
    answer             // optionOne or optionTwo
  }
}

export function handleAnswerQuestion (qid, answer) {
  console.log("*** qid: ", qid)
  console.log("*** answer: ", answer)
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(answerQuestion(qid, authedUser, answer))
      })
      .then(() => dispatch(hideLoading()))
  }
}
