import React, { Component } from 'react'
import { connect } from 'react-redux'

class NoMatch extends Component {
  render() {
    return (
      <div>
        {(this.props.authedUser === '' || this.props.authedUser === null)
        ? <h2>Sign in first</h2> : null}
        <h2>Error 404: Page Not Found</h2>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NoMatch)
