import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChange = (e) => {
    e.preventDefault()

    const optionText = e.target.value
    const optionName = e.target.name

    this.setState((prevState) => ({
      ...prevState,
      [optionName]: optionText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {  // Go to the home ('/') view
      return <Redirect to='/' />
    }

    return (
      <div className='container'>
        <h2 className='center'>Create New Question</h2>

        <form className='new-question' onSubmit={this.handleSubmit}>

          <p>Complete the question</p>

          <h3>Would you rather...</h3>

          <div>
            <input type='text'
              value={optionOneText}
              name='optionOneText'
              onChange={this.handleChange}
              className='new-question-input'
            />
          </div>

          <p>or</p>

          <div>
            <input type='text'
              value={optionTwoText}
              name='optionTwoText'
              onChange={this.handleChange}
              className='new-question-input'
            />
          </div>

          <button className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(AddQuestion)
