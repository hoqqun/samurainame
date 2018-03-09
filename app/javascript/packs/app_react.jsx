import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import Display from './display.jsx'
import ErrorDialog from './error_dialog.jsx'


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
  // ビッグレタースモールレター の半角英字であれば、true。それ以外false
  alphabet(value) {
    if (/^[A-Za-z]+$/.test(value)) {
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
  
  // backボタンイベントハンドラ
  onClickBack() {
    window.location.href = "./"
  }

  // Generateボタンイベントハンドラ
  // バリデーションエラーがないことを確認したあとに、fetchAPI通信を行う
  onClickSubmit() {
    if(this.state.formValid.name == true && this.state.formValid.date == true) {

      const csrfToken = document.getElementsByName('csrf-token').item(0).content

      fetch('/names/fetch', {
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
    } else {
      this.refs.error.handleOpen()
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
    
    //ボタン用スタイル
    const style = {
      margin: 12,
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <header>
            <h1>Your Samurai Name Generator ver1.0</h1>
          </header>
          <section className="wrapper">
              <div className="wrapper_form">
                <div>Please Input</div>
                <div><OriginalName formValid={this.state.formValid.name} formError={this.state.formErrors.name} onChange={(event) => this.onChangeName(event)} /></div>
                <div><GenderRadioButtons onChange={(event,value) => this.onChangeMale(event,value)} /></div>
                <div><DatePicker maxDate={new Date()}floatingLabelText="Your Birth Day" hintText="1986/03/05" onChange={(event, date) => this.onChangeDate(event,date)} /></div>
                <div><RaisedButton primary={true} label="Generate" onClick={() => this.onClickSubmit()} style={style} /></div>
                <div><ErrorDialog ref="error"/></div>
              </div>
              <div className="wrapper_display">
                <Display nihongo={this.state.nihongo} romeji={this.state.romeji} reset={() => this.onClickBack()}/>
              </div>
          </section>
          <footer><h1>Copyright(c)2018 Esumura,Fukuda,Kurihara. Allright Reserved.</h1></footer>
        </div>
      </MuiThemeProvider>
    )
  }
}

// 名前入力フィールドのコンポーネント
// 入力エラーを判定し、表示を切り替えている
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
        <TextField hintText="FirstName" floatingLabelText='Your Name' onChange={(event) => this._onChange(event)} />
      )
    } else {
      return (
        <TextField hintText="FirstName" errorText={this.props.formError} floatingLabelText='Your Name' onChange={(event) => this._onChange(event)} />
      )
    }
  }
}

// 性別ラジオボタンのコンポーネント
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

