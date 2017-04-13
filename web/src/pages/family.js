import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map} from 'ramda'
import BasicButton from '../components/basic-button'


class Family extends Component {
  componentDidMount () {
      fetch('http://localhost:8080/children/')
        .then(res => res.json())
        .then(children => this.props.dispatch({type: 'SET_CHILDREN',
          payload: children })
        )
  }

  render() {
    const props = this.props
    const li = (child) => {
      if (child.familyId === props.family.familyId) {
      return (
        <li key={child.id}>
          <BasicButton
            onClick={e => this.props.history.push('/children/' + child.id)}>
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
  children: state.children
})


const connector = connect(mapStateToProps)

export default connector(Family)
