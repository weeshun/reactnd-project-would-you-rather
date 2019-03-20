import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChange = (e) => {
    e.preventDefault()

    if (e.target.name === 'optionOneText') {
      const optionOneText = e.target.value
      this.setState((prevState) => ({
        ...prevState,
        optionOneText: optionOneText
      }))
    } else {
      const optionTwoText = e.target.value
      this.setState((prevState) => ({
        ...prevState,
        optionTwoText: optionTwoText
      }))
    }
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

    // onChange={(e) => this.handleChange(e)}

    return (
      <div className='container'>
        <h3 className='center'>Create New Question</h3>

        <form className='new-question' onSubmit={this.handleSubmit}>

          <h4>Complete the question</h4>

          <p>Would you rather...</p>

          <div className='input'>
            <input type='text'
              value={optionOneText}
              name='optionOneText'
              onChange={this.handleChange}
              className='input'
            />
          </div>

          <p>OR</p>

          <div className='input'>
            <input type='text'
              value={optionTwoText}
              name='optionTwoText'
              onChange={this.handleChange}
              className='input'
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
