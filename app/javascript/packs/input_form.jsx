import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker';

class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {name: "", nihongo: "", male:true, birth_year:"1999", birth_month:"01", birth_day:"01"}
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
          birth_year: this.state.birth_year,
          birth_month: this.state.birth_month,
          birth_day: this.state.birth_day,
          birth_date: this.state.birth_date
        }})
    })
    .then((response) => response.json())
    .then((json) => window.alert(json.nihongo))
  }

  onChangeName(event) {
    this.setState({name: event.target.value})
  }

  onChangeMale(event,value) {
    this.setState({male: value == "on"})
  }

  onChangeBirthYear(event) {
    this.setState({birth_year: event.target.value})
  }

  onChangeBirthMonth(event) {
    this.setState({birth_month: event.target.value})
  }

  onChangeBirthDay(event) {
    this.setState({birth_day: event.target.value})
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
          <div><TextField hintText="FirstName LastName" onChange={(event) => this.onChangeName(event)} /></div>
          <div>
            <RadioButtonGroup name="male" defaultSelected="on" onChange={(event,value) => this.onChangeMale(event,value)}>
              <RadioButton value="on" label="Male"/>
              <RadioButton value="off" label="Female"/>
            </RadioButtonGroup>
          </div>
          <div><DatePicker hintText="Your Birth Day" container="inline" onChange={(event, date) => this.onChangeDate(event,date)} /></div>
          <div><RaisedButton label="Generate" onClick={() => this.onClickSubmit()} style={style} /></div>
        </div>
      </MuiThemeProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <InputForm />,
    //document.body.appendChild(document.createElement('div'))
    document.getElementById('app')
  )
})