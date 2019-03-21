import { getInitialData, saveQuestion } from '../utils/api'
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

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question   // formattedQuestion
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    {/*

    */}

    return saveQuestion({    // { optionOneText, optionTwoText, author }
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {  // actually, formattedQuestion
        dispatch(addQuestion(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}
