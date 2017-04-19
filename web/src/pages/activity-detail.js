import React, {Component} from 'react'
import {connect} from 'react-redux'
import {filter, lensProp, set, append, path,
        reduce, pathOr} from 'ramda'
import Footer from '../components/footer'


const getChild = (id) => fetch('http://localhost:8080/children/' + id)

const putActivity = (child, action, badges) => {

  const activitiesLens = lensProp('activities')
  const badgeLens = lensProp('badges')
  let updatedChild = set(activitiesLens, append(action, child.activities), child)

  const badgeObj = filter(badge => badge.name === action.type, badges).pop()
  console.log(`activities for ${badgeObj.name} badge points `, filter(act => act.type === action.type, updatedChild.activities))
  console.log('updatedChild.activities are ', updatedChild.activities)
  const badgeActivities = filter(act => act.type === action.type, updatedChild.activities)

  if (reduce((acc, act) => acc + act.pointValue, 0, badgeActivities) >= badgeObj.pointsRequired) {
    updatedChild = set(badgeLens, append(badgeObj, child.badges), updatedChild)

    fetch('http://localhost:8080/children/' + child._id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedChild)
    })
  } else {
    fetch('http://localhost:8080/children/' + child._id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedChild)
    })
  }
}



class ActivityDetail extends Component  {
  componentDidMount() {
    getChild(this.props.child._id)
      .then(res => res.json())
      .then(child => this.props.set(child))
    }


  render() {
    const props = this.props

    const action = filter(act => act.id === Number(props.match.params.id),
      props.park.activity).pop()

// Trying to append earned badge to child
    const parkerPoints = reduce((acc, acts) => acc + acts.pointValue, 0, pathOr([], ['child', 'activities'], props))


    if (!path(['child', 'childName'], props)) {
      return (<div>
              <h2></h2>
            </div>)
    } else {

    return(
        <div>
          <h3 className='tc'>Hampton Park Scavenger Hunt</h3>
          <hr />
            <div className='ma2'>
              <ul className="list pl0 mt0 measure center">
                <li className="flex items-center lh-copy pa1 ph0-l bb b--black-10">
                <img  className='ba b--black-10 db w3 w3-ns h3 h3-ns'
                src='/parker-bear-orginal-painting.jpg' alt='Parker Bear on swing'></img>
                <div className="pl3 flex-auto">
                <span className="f4 db black-70">Lets {action.header}, {props.child.childName}!</span>
              </div>
              </li>
              </ul>

              <div className="dtc ">
                <img src={action.image} className="ba b--black-10 db w4 h4 w3-ns h3-ns"
                  alt={action.alt}/>
              </div>
              <div className="dtc v-mid pl3">
                <p className="f6 f5-ns fw6 lh-title black mv0">{action.story}</p>
              </div>
              <hr />
              <form onSubmit={props.appendChild(props.history, props.child, props.parks,
                              props.park, props.children, action, props.badges)}>
                <div>
                  <h3>Did you {action.body} ?</h3>
                    <div className="dtc w2 w3-ns v-mid">
                      <img src='/parker-paw-2.png' className="ba b--black-10 db br-100 w2 h2 w3-ns h3-ns"
                        alt='parker bear paw'/>
                      <button>Yes</button>
                    </div>
                    <div className="dtc v-mid pl3">
                      <h1 className="f6 f5-ns fw6 lh-title black mv0">Yes!  I did!</h1>
                      <h2 className="f6 fw4 mt0 mb0 black-60">I just earned {action.pointValue} Parker points!</h2>
                    </div>
                        <div className="dtc w2 w3-ns v-mid">
                          <img src='/parker-paw-2.png' className="ba b--black-10 db br-100 w2 h2 w3-ns h3-ns"
                            alt='parker bear paw'/>
                          <button onClick={props.returnToPark(props.history, props.park)}>No</button>
                        </div>
                        <div className="dtc v-mid pl3">
                          <h1 className="f6 f5-ns fw6 lh-title black mv0">I changed my mind.</h1>
                          <h2 className="f6 fw4 mt0 mb0 black-60">Back to Scavenher hunt</h2>
                        </div>
                </div>
              </form>
              <hr />
              <div>

                <Footer />
              </div>
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
  parks: state.parks,
  park: state.park,
  badges: state.badges
})
const mapActionsToProps = (dispatch) => ({
  set: (child) => dispatch({type: 'SET_CHILD', payload: child}),
  setParks: (parks) => dispatch({type: 'SET_PARKS', payload: parks}),
  appendChild: (history, child, parks, park, children, action, badges) => (e) => {
    e.preventDefault()
    putActivity(child, action, badges)
    fetch('http://localhost:8080/children/' + child._id)
      .then(res => res.json())
      .then(child => dispatch({type: 'SET_CHILD', payload: child}))
    fetch('http://localhost:8080/children')
      .then(res => res.json())
      .then(children => dispatch({type: 'SET_CHILDREN', payload: children}))
      history.push('/parks/' + park._id)
  },
  returnToPark: (history, park) => (e) => {
    e.preventDefault()
    history.push('/parks/' + park._id)
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ActivityDetail)
