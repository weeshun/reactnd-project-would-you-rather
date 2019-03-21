import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { formatTweet, formatDate } from '../utils/helpers'
import { getShorterStr } from '../utils/helpers'
//import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
//import { handleToggleTweet} from '../actions/tweets'
import { withRouter } from 'react-router-dom'
  // import { Redirect } from 'react-router-dom'
import QuestionPoll from './QuestionPoll.js'

class Question extends Component {
  // state = {
  //   showUnanswered: true
  // }

  /*
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }
  */

  showInfo = (e, id) => {
    e.preventDefault()

    this.props.history.push(`/questions/${id}`)
    //<Redirect to="/questions/{id}" />
    // <Redirect to=`/questions/${id}` />
    //<QuestionPoll id={id}/>
  }

  render() {
    const { authedUser, user, question } = this.props  // Provided as a prop by connect() - see mapStateToProps

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo  // id is now required
    } = question
    //const answered = Object.keys(user.answers).includes(question.id)
    const answered =  question.optionOne.votes.includes(authedUser)
                   || question.optionTwo.votes.includes(authedUser)
    const buttonName = answered ? "VIEW POLL" : "VOTE"
    const shortAnswerSample = getShorterStr(question.optionOne.text)

    return (
      <div className='question'>
        <div>
          {user.name} asks:
        </div>
        <div className='question-info'>
          <span>
            <img
              src={`{user.avatarURL}`}
              alt={`Avatar of ${user.name}`}
              className='avatar'
            />
          </span>
          <h5>Would you rather</h5>
          <div className='short-sample-answer'>...{shortAnswerSample}...</div>
          <button className='btn'
            onClick={(e) => this.showInfo(e, id)}>
              {buttonName}
          </button>
        </div>
      </div>
    )
  }
}

// <div className='question-info'>
//   <div>
//     <span>{user.name}</span>
//     <div>{formatDate(timestamp)}</div>
//     {parent && (
//       <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
//         Replying to @{parent.author}
//       </button>
//     )}
//     <p>{text}</p>
//   </div>
//
//   <div className='tweet-icons'>
//     <TiArrowBackOutline className='tweet-icon' />
//     <span>{replies !== 0 && replies}</span>
//     <button className='heart-button' onClick={this.handleLike}>
//       {hasLiked === true
//         ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
//         : <TiHeartOutline className='tweet-icon' />}
//     </button>
//     <span>{likes !== 0 && likes}</span>
//   </div>
// </div>

function mapStateToProps({authedUser, users, questions}, { id }) {
  // id provided as a prop to Tweet component
  const question = questions[id]
  const user = users[question.author]
  //const answered = Object.keys(users[authedUser].answers).includes(id)

  return {
    authedUser,
    user,
    // question: question
    //   ? formatQuestion(question, users[question.author], authedUser)
    //   : null
    question
  }
}

export default withRouter(connect(mapStateToProps)(Question))
// export default connect(mapStateToProps)(Question)
