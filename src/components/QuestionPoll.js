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
  
  render() {
    //const { id, replies } = this.props  // mapStateToProps retuns { id, replies }
    return (
      <div>
        PollInfo
      </div>
    )
  }
}

// function mapStateToProps ({ authedUser, questions, users }, props) {
//   // 2nd arg for those passed as props to TweetPage component
//   // App.js: <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}} />
//   const { id } = props.match.params
//
//   return {
//     id,
//     replies: !questions[id]
//       ? []
//       : questions[id].replies.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
//   }
// }
//
// export default connect(mapStateToProps)(ViewPoll)
export default connect()(QuestionPoll)
