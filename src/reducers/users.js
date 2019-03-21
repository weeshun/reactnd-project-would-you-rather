import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/shared'

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

    default :
      return state
  }
}
