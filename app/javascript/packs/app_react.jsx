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
      formErrors: {name: '', date: ''},
      formValid: {name:false, date:false},
      birth_date: {birth_year:0, birth_month:0, birth_date:0}
    }

    const type = {
      required: "required",
      alphabet: "alphabet",
      futureDate: "futureDate"
    }
  }

  // 必須入力チェック
  // nullまたはブランの場合、falseを返す。それ以外はtrue
  required(value) {
    if ( value == null || value == "") {
      return false
    } else {
      return true
    }
  }

  // 半角英チェック
  // ビッグレタースモールレター の半角英字と半角スペースだけであれば、true。それ以外false
  alphabet(value) {
    if (/^[A-Za-z\s]+$/.test(value)) {
      return true
    } else {
      return false
    }
  }

  // デートフォーマットチェック
  // 1YYY-MM-DD or 2YYY-MM-DDであれば、true。それ以外false
  dateFormat(value) {
    if (/^[12][0-9][0-9][0-9]-[0-9]+-[0-9]+$/.test(value)) {
      return true
    } else {
      return false
    }
  }

  // 未来日付チェック
  futureDate(date) {
    let today = new Date()

    if (date.getTime() <= today.getTime()) {
      return true
    } else {
      return false
    }
  }

  validate(value,type) {
    if (type == "required") {
      return required(value)
    } else if (type == "alphabet") {
      return alphabet(value)
    } else if (type == "futureDate") {
      return futureDate(value)
    } else if (type == "dateFormat") {
      return dateFormat(value)
    }
  }
  
  // Generateボタンイベントハンドラ
  // バリデーションエラーがないことを確認したあとに、fetchAPI通信を行う
  onClickSubmit() {
    if(this.state.formValid.name == true && this.state.formValid.date == true) {

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
  }

  // OriginalNameコンポーネント用イベントハンドラ
  // 入力チェックを行ったあとに、必要stateを更新する
  onChangeName(event) {
    if (this.alphabet(event.target.value)) {
      this.setState({name: event.target.value})
      this.setState({formValid:{name:true, date:this.state.formValid.date}})
    } else {
      this.setState({name: event.target.value})
      this.setState({formValid:{name:false,date:this.state.formValid.date}})
      this.setState({formErrors:{name:"Error. Please Use only A-Za-z"}})
    }
  }

  // GenderRadioButtonコンポーネント用イベントハンドラ
  onChangeMale(event,value) {
    this.setState({male: value == "on"})
  }

  // Javascript Dateオブジェクトより取得した月に+1月する
  // JS DateオブジェクののgetMonthメソッドは曲者で、本当の月ではなく0〜11を返すため
  getTrueMonth(month) {
    return (Number(month) + 1)
  }

  // DatePickerコンポーネント用のイベントハンドラ
  // 入力チェックを行ったあと、Stateを更新する
  onChangeDate(event,date) {
    let str = date.getFullYear() + "-" + String(this.getTrueMonth(date.getMonth())) + "-" + date.getDate()
    let today = new Date()

    if (this.dateFormat(str) && this.futureDate(date)) {
      this.setState({formValid:{name:this.state.formValid.name,date:true}})
      this.setState({birth_date:{birth_year: date.getFullYear(), birth_month: this.getTrueMonth(date.getMonth()), birth_day: date.getDate()}})
    } else {
      this.setState({formValid:{name:this.state.formValid.name,date:false}})
    }
    
  }

  render() {
    const style = {
      margin: 12,
    }

    if (this.state.nihongo == "") {
      return (
        <MuiThemeProvider>
          <div>
            <div className="first_logo"></div>
            <div><OriginalName formValid={this.state.formValid.name} formError={this.state.formErrors.name} onChange={(event) => this.onChangeName(event)} /></div>
            <div><GenderRadioButtons onChange={(event,value) => this.onChangeMale(event,value)} /></div>
            <div><DatePicker floatingLabelText="Your Birth Day" hintText="1986/03/05" container="inline" onChange={(event, date) => this.onChangeDate(event,date)} /></div>
            <div><RaisedButton label="Generate" onClick={() => this.onClickSubmit()} style={style} /></div>
            <br/>
          </div>
        </MuiThemeProvider>
      )
    }
    else {
      return (
        <div className="display">
          <div className="result_male"></div>
          <div><Display nihongo={this.state.nihongo} romeji={this.state.romeji} /></div>        
        </div>
      )
    }
  }
}

class OriginalName extends Component {
  constructor(props) {
    super(props)
  }

  _onChange(event) {
    this.props.onChange(event)
  }

  render() {
    if(this.props.formValid == true) {
      return (
        <TextField hintText="FirstName LastName" floatingLabelText='Your Name' onChange={(event) => this._onChange(event)} />
      )
    } else {
      return (
        <TextField hintText="FirstName LastName" errorText={this.props.formError} floatingLabelText='Your Name' onChange={(event) => this._onChange(event)} />
      )
    }
  }
}

class GenderRadioButtons extends Component {
  constructor(props) {
    super(props)
  }

  _onChange(event,value) {
    this.props.onChange(event,value)
  }

  render() {
    return (
      <RadioButtonGroup name="male" errorText={this.props.errorText} defaultSelected="on" onChange={(event,value) => this._onChange(event,value)} >
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

