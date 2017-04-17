import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map} from 'ramda'
import BasicButton from '../components/basic-button'


const getFamilies = () => fetch('http://localhost:8080/family')
const getChildren = () => fetch('http://localhost:8080/children')
const getFamily = (id) => fetch('http://localhost:8080/family/' + id)


class Family extends Component {
  componentDidMount () {
    if (this.props.match.isExact === false) {
      getFamily(this.props.logInFamily._id)
        .then(res => res.json())
        .then(family => this.props.setFamily(family))
    }
    getFamilies()
    .then(res => res.json())
    .then(families => this.props.setFamilies(families))
  getChildren()
    .then(res => res.json())
    .then(children => this.props.setChildren(children))
  }

// this.props.setFamily(findFamily(this.props.validate, this.props.families))

  render() {
    const props = this.props

    const li = (child) => {
      if (child.familyId === props.family.familyId) {
      return (
        <li key={child._id} className='ph3 pv3 bb b--light-silver'
            onClick={e => this.props.history.push('/children/' + child._id)}
            > {child.childName}
        </li>
      )
    }
  }

    return(
      <div>
  <div className='ph2 pb2 pt1'>
    <article
      className='mw6 mt0 center bg-white br3 pw3 ph2 pa4-ns mb3 ba b--black-10'
    >
      <div className='tc'>
        <img
          src='/parker-bear-orginal-painting.jpg'
          className='br-100 h3 w3 dib'
          title='Parker the Bear'
        />
      <h1 className='f4'>Hi {props.family.parentLast} family!</h1>
        <hr className='mw3 bb bw1 b--black-10' />
</div>
<p className='lh-copy measure center f6 black-70'>
  Welcome to your very own Parker home page!
</p>
<p className='lh-copy measure center f6 black-70'>
  Who wants to go first today?
</p>
<p className='lh-copy measure center f6 black-70'>
  Go to YOUR very own Parker page and lets have some fun!
</p>
          </article>

          <article className='pa2 pa5-ns'>
  <h1 className='f4 ma0 bold center mw6'>Children</h1>
  <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
    {map(li, props.children)}

  </ul>
</article>
</div>
</div>
)
}
}

const mapStateToProps = (state) => ({
  family: state.family,
  families: state.families,
  children: state.children,
  logInFamily: state.logInFamily

})
const mapActionsToProps = dispatch => ({
  setChildren: (children) => dispatch({type: 'SET_CHILDREN', payload: children}),
  setFamilies: (families) => dispatch({type: 'SET_FAMILIES', payload: families}),
  setFamily: (family) => dispatch({type: 'SET_FAMILY', payload: family})
})


const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Family)
