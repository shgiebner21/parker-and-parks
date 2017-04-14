import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pathOr, map} from 'ramda'
import TextField from '../components/input-text'
import BasicButton from '../components/basic-button'


const getFamilies = () => fetch('http://localhost:8080/family')

const loginFamily = (family) => {
  if (family.eMail === this.props.validate.eMail) {
    return family.eMail
  } else {
    alert('no matching eMail on file')
  }
}

class Login extends Component {
  componentDidMount() {
    getFamilies()
      .then(res => res.json())
      .then(families => this.props.set(families))
  }

  render() {
    const props = this.props


    return(
      <div>
      <h2>Login</h2>
      <form onSubmit={props.submit(props.validate, props.families, props.history)}>
      <TextField label='E-Mail address'
                 value={pathOr('', ['validate', 'eMail'], props)}
                 onChange={props.validateEMail}
                 optional={false}
      />
      <TextField label='Password'
                        value={pathOr('', ['validate', 'password'], props)}
                        onChange={props.validatePassword}
                        optional={false}
                        help='Password must use...'
                        width='w-20'
      />
      <BasicButton>Login</BasicButton>
      <a className='link f6' href='#'
         onClick={e => props.history.goBack()}>Cancel</a>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  families: state.families,
  validate: state.validate
})
const mapActionsToProps = (dispatch) => ({
  set: (families) => dispatch({type: 'SET_FAMILIES', payload: families}),
  validateEMail: (e) => dispatch({type: 'VALIDATE_EMAIL', payload: e.target.value}),
  validatePassword: (e) => dispatch({type: 'VALIDATE_PASSWORD', payload: e.target.value}),
  submit: (validate, families, history) => (e) => {
    dispatch({type: 'SET_VALIDATION', payload: validate})
    console.log('validate eMail is ', validate.eMail)
    console.log('family eMail is ', map(loginFamily, families))
    if (validate.eMail === map(loginFamily, families)) {
      history.push('/family')
    } else {
      alert('eMail or password is incorrect.')
    }
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Login)
