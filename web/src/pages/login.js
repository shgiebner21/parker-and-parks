import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pathOr, map} from 'ramda'
import TextField from '../components/input-text'
import BasicButton from '../components/basic-button'


const getFamilies = () => fetch('http://localhost:5000/family')

const loginFamily = (family) => {
  return family.eMail
}

class Login extends Component {
  componentDidMount() {
    getFamilies()
      .then(res => res.json())
      .then(family => this.props.set(family))
  }

  render() {
    const props = this.props


    return(
      <div>
      <h2>Login</h2>
      <form onSubmit={props.submit(props.validate, props.family, props.history)}>
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
  family: state.family,
  validate: state.validate
})
const mapActionsToProps = (dispatch) => ({
  set: (family) => dispatch({type: 'SET_FAMILY', payload: family}),
  validateEMail: (e) => dispatch({type: 'VALIDATE_EMAIL', payload: e.target.value}),
  validatePassword: (e) => dispatch({type: 'VALIDATE_PASSWORD', payload: e.target.value}),
  submit: (validate, family, history) => (e) => {

    dispatch({type: 'SET_VALIDATION', payload: validate})
    if (validate.eMail === map(loginFamily, family)) {
      history.push('/family/' + family.id)
    }
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Login)
