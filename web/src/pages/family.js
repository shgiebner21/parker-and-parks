import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map, filter, compose} from 'ramda'
import BasicButton from '../components/basic-button'


const getFamilies = () => fetch('http://localhost:8080/family')
const getChildren = () => fetch('http://localhost:8080/children')

const findFamily = (val, families) =>  {
  const valMail = compose(
    filter(eMail => eMail === val.eMail),
    map(fam => fam.eMail)
  )(families)
  const valEMail = valMail.pop()

console.log(map(fam => fam.eMail, families))
  console.log((valEMail === map(fam => fam.eMail, families)))

}

class Family extends Component {
  componentDidMount () {
    getFamilies()
    .then(res => res.json())
    .then(families => this.props.setFamilies(families))
  getChildren()
    .then(res => res.json())
    .then(children => this.props.setChildren(children))

  }


  render() {
    const props = this.props
    findFamily(props.validate, props.families)

    const li = (child) => {
      if (child.familyId === props.family.familyId) {
      return (
        <li key={child._id}>
          <BasicButton
            onClick={e => this.props.history.push('/children/' + child._id)}>
            {child.childName}</BasicButton>
        </li>
      )
    }
  }

    return(
      <div className='ma2'>
      <h4>Hi {props.family.parentLast} family!</h4>
      <h4>Welcome to your very own Parker home page!</h4>
      <h4>Who wants to go first today?</h4>
      <h4>Go to YOUR very own Parker page and lets have some fun!</h4>
      <hr />
      <ul>
        {map(li, props.children)}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  family: state.family,
  families: state.families,
  children: state.children,
  validate: state.validate

})
const mapActionsToProps = dispatch => ({
  setChildren: (children) => dispatch({type: 'SET_CHILDREN', payload: children}),
  setFamilies: (families) => dispatch({type: 'SET_FAMILIES', payload: families}),
  setFamily: (family) => dispatch({type: 'SET_FAMILY', payload: family})
})


const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Family)
