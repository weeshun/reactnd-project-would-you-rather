import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false  // whether to go to the home ('/') view
  }

  handleChangeOne = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText: optionOneText
    }))
  }

  handleChangeTwo = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText: optionTwoText
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

    const optionOneTextLeft = 280 - optionOneText.length
    const optionTwoTextLeft = 280 - optionTwoText.length

    // <textarea
    //   value={text}
    //   onChange={this.handleChange}
    //   className='textarea'
    //   maxLength={280}
    // />

    // <input>: single line text

    return (
      <div>
        <h3 className='center'>Create New Question</h3>

        <form className='new-question' onSubmit={this.handleSubmit}>

          <h5 className='center'>Complete the question</h5>

          <p>Would you rather...</p>

          <div className='input'>
            <input type='text'
              value={optionOneText}
              name='optionOneText'
              onChange={this.handleChangeOne}
              className='input'
              maxLength={280}
            />

            {optionOneTextLeft <= 100 && (
              <div className='question-length'>
                {optionOneTextLeft}
              </div>
            )}
          </div>

          <p>OR</p>

          <div className='input'>
            <input type='text'
              value={optionTwoText}
              name='optionTwoText'
              onChange={this.handleChangeTwo}
              className='input'
              maxLength={280}
            />

            {optionTwoTextLeft <= 100 && (
              <div className='question-length'>
                {optionTwoTextLeft}
              </div>
            )}
          </div>

          <button
            className='btn'
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
