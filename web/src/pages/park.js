import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map, filter} from 'ramda'
import Activity from '../components/activity'


const getPark = (id) => fetch('http://localhost:8080/parks/' + id)


class Park extends Component {
  componentDidMount() {
    getPark(this.props.match.params.id)
      .then(res => res.json())
      .then(park => this.props.setPark(park))
  }


  render() {
    const props = this.props
    const park = filter(park => park._id === props.match.params.id, props.parks).pop()

      const li = (activity) => {
        return ( <a key={activity.id}>
                  <Activity
                    label={activity.name}
                    value={activity.pointValue}
                    image={activity.image}
                    onClick={e => this.props.history.push('/activitydetail/' + activity.id)} />
                </a>  )}

      return(
        <div
          >
          <div
            >
              <div className='ma2'>
                <ul className="list pl0 mt0 measure center">
                  <li className="flex items-center lh-copy pa1 ph0-l bb b--black-10">
              <img  className='ba b--black-10 db w3 w3-ns h3 h3-ns'
                  src='/parker-bear-orginal-painting.jpg' alt='Parker Bear on swing'></img>
                  <div className="pl3 flex-auto">
                  <span className="f4 db black-70">Welcome to {park.parkName}, {props.child.childName}!</span>
                  <small>Let's go play in the Park!</small>
                </div>
                </li>
                </ul>
              </div>

              <div>
                <ul>
                  {map(li, park.activity)}
                </ul>
                <div>
                  <a className="pa2 f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-green"
                    onClick={e => this.props.history.push('/children/' + props.child.id)} >My Page</a>
                </div>
              </div>
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  family: state.family,
  children: state.children,
  child: state.child,
  parks: state.parks,
  park: state.park
})
const mapActionsToProps = (dispatch) => ({
  setPark: (park) => dispatch({type: 'SET_PARK', payload: park})
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Park)
