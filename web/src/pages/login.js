import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pathOr, map, compose, filter} from 'ramda'
import TextField from '../components/input-text'
import BasicButton from '../components/basic-button'


const getFamilies = () => fetch('http://localhost:8080/family')

const currentFamily = (families, validate) => {
  const famMail = compose(
    filter(eMail => eMail === validate.eMail),
    map(fam => fam.eMail)
  )(families)

  const famPass = compose(
    filter(pass => pass === validate.password),
    map(fam => fam.password)
  )(families)

  const famEMail = famMail.pop()
  const famPassword = famPass.pop()

  if (validate.eMail === famEMail && validate.password === famPassword) {
    return famEMail
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
      <form onSubmit={props.submit(props.validate, props.families, props.history, currentFamily(props.families, props.validate))}>
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
  submit: (validate, families, history, famEMail) => (e) => {
    e.preventDefault()
    dispatch({type: 'SET_VALIDATION', payload: validate})
    if (validate.eMail === famEMail) {
      history.push('/family')
    } else {
      alert('eMail or password is incorrect.')
    }
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Login)
