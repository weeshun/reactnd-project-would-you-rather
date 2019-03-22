import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/shared'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

    case ADD_QUESTION :  // type, formattedQuestion
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      }

    case ANSWER_QUESTION :    // type, qid, authedUser, answer ('optionOne' or 'optionTwo')
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }

    default :
      return state
  }
}
