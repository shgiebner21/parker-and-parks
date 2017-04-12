import {createStore, combineReducers} from 'redux'
import {set, lensProp} from 'ramda'

const initialFamily = {
  familyId: '',
  parentFirst: '',
  parentLast: '',
  eMail: '',
  cellPhone: '',
  streetAddress: '',
  streetAddress2: '',
  city: '',
  state: '',
  zip: '',
  password: ''
}


const family = (state=initialFamily, action) => {
  switch (action.type) {
    case 'SET_PARENT_FIRST':
      return set(lensProp('parentFirst'), action.payload, state)
      case 'SET_PARENT_LAST':
        return set(lensProp('parentLast'), action.payload, state)
      case 'SET_EMAIL':
        return set(lensProp('eMail'), action.payload, state)
      case 'SET_CELL':
        return set(lensProp('cellPhone'), action.payload, state)
      case 'SET_STREET':
        return set(lensProp('streetAddress'), action.payload, state)
      case 'SET_STREET2':
        return set(lensProp('streetAddress2'), action.payload, state)
      case 'SET_CITY':
        return set(lensProp('city'), action.payload, state)
      case 'SET_STATE':
        return set(lensProp('state'), action.payload, state)
      case 'SET_ZIP':
        return set(lensProp('zip'), action.payload, state)
      case 'SET_PASSWORD':
        return set(lensProp('password'), action.payload, state)
      case 'SET_FAMILY':
        return action.payload
      case 'CLEAR_FAMILY':
        return {}
    default:
      return state
  }
}


const children = (state=[], action) => {
  switch (action.type) {
    case 'SET_CHILDREN':
      return action.payload
    case 'SET_CHILD_NAME':
      return set(lensProp('childName'), action.payload, state)
    case 'SET_CHILD_AGE':
      return set(lensProp('childAge'), action.payload, state)
    case 'SET_CHILD_SEX':
      return set(lensProp('childsSex'), action.payload, state)
    case 'SET_CHILD_NOTES':
      return set(lensProp('childNotes'), action.payload, state)
    case 'CLEAR_CHILDREN':
      return []
    default:
      return state
  }
}

const child = (state=[], action) => {
  switch (action.type) {
    case 'SET_CHILD':
      return action.payload
    default:
      return state
  }
}

const initialPark = {
  park: '',
  activity: []
}

const parks = (state=initialPark, action) => {
  switch (action.type) {
    case 'SET_PARKS':
      return action.payload
    default:
      return state
  }
}

const badges = (state=[], action) => {
  switch (action.type) {
    case 'SET_BADGES':
      return action.payload
    default:
      return state
  }
}

const initialValidate = {
  eMail: '',
  password: ''
}

const validate = (state=initialValidate, action) => {
  switch (action.type) {
    case 'SET_VALIDATION':
      return action.payload
    case 'VALIDATE_EMAIL':
      return set(lensProp('eMail'), action.payload, state)
    case 'VALIDATE_PASSWORD':
      return set(lensProp('password'), action.payload, state)
    default:
      return state
  }
}


const store = createStore(
  combineReducers({
    family,
    children,
    child,
    parks,
    badges,
    validate
  })
)

export default store
