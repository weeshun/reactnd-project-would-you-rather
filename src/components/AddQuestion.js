import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { handleAddTweet } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    text: '',
    toHome: false  // whether to go to the home ('/') view
  }

  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {  // text box
    e.preventDefault()

    const { text } = this.state
    const { dispatch, id } = this.props
    // id is for parent tweet
    //   /new: brand new tweet
    //   if id is passed, then it's a reply

    dispatch(handleAddQuestion(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true  // Don't go to the home ('/') view if the parent tweet exists
    }))
  }

  render() {
    const { text, toHome } = this.state

    if (toHome === true) {  // Go to the home ('/') view
      return <Redirect to='/' />
    }

    const questionLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose New Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />

          {questionLeft <= 100 && (
            <div className='question-length'>
              {questionLeft}
            </div>
          )}

          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(AddQuestion)
