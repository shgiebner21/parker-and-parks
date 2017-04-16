import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map, reduce, filter, compose, path, pathOr, sort} from 'ramda'
import ChildButton from '../components/child-button'


const getChild = (id) => fetch('http://localhost:8080/children/' + id)
const getChildren = () => fetch('http://localhost:8080/children')
const getBadges = () => fetch('http://localhost:8080/badges')
const getParks = () => fetch('http://localhost:8080/parks')


class Child extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id)
    if (this.props.match.params.id === 'undefined') {
      getChild(this.props.child._id)
        .then(res => res.json())
        .then(child => this.props.setChild(child))
    } else {
      getChild(this.props.match.params.id)
        .then(res => res.json())
        .then(child => this.props.setChild(child))
    }
    getChildren()
    .then(res => res.json())
    .then(children => this.props.setChildren(children))
    getBadges()
      .then(res => res.json())
      .then(badges => this.props.setBadges(badges))
    getParks()
      .then(res => res.json())
      .then(parks => this.props.setParks(parks))
  }

  render() {
    const props = this.props
    if (!path(['child', 'childName'], props)) {
      return (<div>
              <h2></h2>
            </div>)
    } else {
      const li = (badge) => {
        return ( <div key={badge.image}>
                  <img src={badge.image} alt={badge.alt}
                    className='br2 h3 w3 dib'></img>
                </div>) }

      const liActs = (acts) => {
        return  <li key={acts.image}>{acts.name}</li>
      }

  //find siblings of this child & then makes a button for each sibling
      const findSiblings = (child, sibs) => {
        return (filter(sib => (sib.familyId === child.familyId &&
                        sib.childName !== child.childName) === true, sibs))
      }

      const parkButton = (park, history) => {
        return <ChildButton label={park.parkName} key={park.parkName}
                             onClick={e => this.props.history.push('/parks/' + park._id)} />
      }

      const makeButton = (sib) => {
        return <ChildButton label={sib.childName} key={sib.childName}
                            onClick={e => this.props.history.push('/children/' +sib._id)} />
      }

      const parkerPoints = reduce((acc, acts) => acc + acts.pointValue, 0, pathOr([], ['child', 'activities'], props))
      const fitnessPoints = compose(
        reduce((acc, acts) => acc + acts.pointValue, 0, ),
        filter(act => act.type === 'fitness')
      )(pathOr([], ['child', 'activities'], props))

      const scholarPoints = compose(
        reduce((acc, acts) => acc + acts.pointValue, 0, ),
        filter(act => act.type === 'learning')
      )(pathOr([], ['child', 'activities'], props))

      const samaritanPoints = compose(
        reduce((acc, acts) => acc + acts.pointValue, 0, ),
        filter(act => act.type === 'samaritan')
      )(pathOr([], ['child', 'activities'], props))


  //pull children in family for Family Rank calc and order them by points
  //pull all children for CPC Rank calc and order them by points
        const familyChildren = (child, sibs) => {
        return compose(
          filter(sib => (sib.familyId === child.familyId) === true)
        )(sibs)
      }

      const rankFamily = (child) => {
        return <li key={child.childName}>{child.childName} - {reduce((acc, acts) => acc + acts.pointValue, 0, child.activities)} Parker points</li>
      }


      return(
        <div className='ma2'>
          <ul className="list pl0 mt0 measure center">
            <li className="flex items-center lh-copy pa1 ph0-l bb b--black-10">
        <img  className='ba b--black-10 db br-100 w3 w3-ns h3 h3-ns'
            src='/parker-bear-orginal-painting.jpg' alt='Parker Bear on swing'></img>
            <div className="pl3 flex-auto">
            <span className="f4 db black-70">Hi {props.child.childName}!</span>
          </div>
          </li>
          </ul>
          <div className="dtc v-mid pl3">
        <h4>Welcome to your very own Parker home page!</h4>
        </div>

        <hr />
          <h3>{pathOr('', ['child', 'childName'], props)}s Park activities:</h3>
          <div className='pl2'>
          <h4>Activities completed:</h4>
            <ul>
              {map(liActs, pathOr([], ['child', 'activities'], props))}
            </ul>
          <h4>Badges:</h4>
            {map(li, pathOr([], ['child', 'badges'], props))}

          <h4>Parker points: {parkerPoints}  </h4>
          <ul>
            <li>Fitness points: {fitnessPoints}</li>
            <li>Scholar points: {scholarPoints}</li>
            <li>Samaritan points: {samaritanPoints}</li>
          </ul>
          <h4>Family Rank:</h4>
          <ol>
            {map(rankFamily, familyChildren(props.child, props.children))}
          </ol>
          <h4>CPC Rank:</h4>
          <ol>
            {map(rankFamily, props.children)}
          </ol>
          <hr />
        </div>
        <div >
          {map(parkButton, props.parks, props.history)}
          {map(makeButton, findSiblings(props.child, props.children))}
        </div>
        </div>
      )
    }

  }
}

const mapStateToProps = (state) => ({
  family: state.family,
  children: state.children,
  child: state.child,
  badges: state.badges,
  parks: state.parks
})
const mapActionsToProps = (dispatch) => ({
  setChild: (child) => dispatch({type: 'SET_CHILD', payload: child}),
  setChildren: (children) => dispatch({type: 'SET_CHILDREN', payload: children}),
  setBadges: (badges) => dispatch({type: 'SET_BADGES', payload: badges}),
  setParks: (parks) => dispatch({type: 'SET_PARKS', payload: parks})
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Child)
