import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {name: "", nihongo: "", gender:true}
  }

  onClickSubmit() {

    const csrfToken = document.getElementsByName('csrf-token').item(0).content

    fetch('http://localhost:3000/names/fetch', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({name: {name: this.state.name, gender: this.state.gender}})
    })
    .then((response) => response.json())
    .then((json) => window.alert(json.nihongo))
  }

  onChangeName(event) {
    this.setState({name: event.target.value})
  }

  onChangeGender(event) {
    this.setState({gender: event.target.value == "on"})
  }

  render() {
    return (
      <div>
        <div>Your Name : <input type="text" name="name" onChange={(event) => this.onChangeName(event)} /></div>
        <div>
          <input type="radio" value="on" checked={this.state.gender} onChange={(event) => this.onChangeGender(event)} /> Male
          <input type="radio" value="off" checked={!this.state.gender} onChange={(event) => this.onChangeGender(event)} /> Female
        </div>
        <div><input type="submit" value="Generate" onClick={() => this.onClickSubmit()} /></div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <InputForm />,
    document.body.appendChild(document.createElement('div'))
  )
})