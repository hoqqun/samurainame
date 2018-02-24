import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import Display from './display.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      romeji: "",
      nihongo: "",
      male:true,
      validation:false
    }
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
      body: JSON.stringify({name: 
        {
          name: this.state.name, 
          male: this.state.male,
          birth_date: this.state.birth_date
        }})
    })
    .then((response) => response.json())
    .then((json) => this.setState({nihongo: json.nihongo, romeji: json.romeji}))
  }

  onChangeName(event) {
    console.log(event.target.value)
    if (/[\D]+/.test(event.target.value)) {
      console.log("valid")
      this.setState({name: event.target.value})
    } else {
      console.log("invalid")
      this.setState({validation:true})
    }
  }

  onChangeMale(event,value) {
    this.setState({male: value == "on"})
  }

  onChangeDate(event,date) {
    this.setState({birth_year: date.getFullYear(), birth_month: date.getMonth(), birth_day: date.getDate()})
  }

  render() {
    const style = {
      margin: 12,
    }

    return (
      <MuiThemeProvider>
        <div>
          <div><TextField hintText="FirstName LastName" floatingLabelText='Your Name' onChange={(event) => this.onChangeName(event)} /></div>
          <div><GenderRadioButtons onChange={(event,value) => this.onChangeMale(event,value)}/></div>
          <div><DatePicker floatingLabelText="Your Birth Day" hintText="1986/03/05" container="inline" onChange={(event, date) => this.onChangeDate(event,date)} /></div>
          <div><RaisedButton label="Generate" onClick={() => this.onClickSubmit()} style={style} /></div>
          <br/>
          <div><Display nihongo={this.state.nihongo} romeji={this.state.romeji} /></div>
        </div>
      </MuiThemeProvider>
    )
  }
}

class GenderRadioButtons extends Component {
  constructor(props) {
    super(props)
  }

  _onChange(event,value) {
    console.log(value)
    this.props.onChange(event,value)
  }

  render() {
    return (
      <RadioButtonGroup name="male" defaultSelected="on" onChange={(event,value) => this._onChange(event,value)}>
        <RadioButton value="on" label="Male" />
        <RadioButton value="off" label="Female" />
      </RadioButtonGroup>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})

