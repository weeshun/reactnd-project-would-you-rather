import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }

    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }

    default :
      return state
  }
}
