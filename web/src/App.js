import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing'
import Signup from './pages/signup'
import Login from './pages/login'
import Children from './pages/children'
import Family from './pages/family'
import Child from './pages/child'
import Park from './pages/park'
import ActivityDetail from './pages/activity-detail'
import Header from './components/header'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='pa1'>
          <header>
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/family' component={Family} />

              <Route path='/parks/:id' component={Park} />
              <Route path='/activitydetail/:id' component={ActivityDetail} />

              <Route path='/children/:id' component={Child} />
              <Route exact path='/children' component={Children} />
            </Switch>
          </main>

        </div>
      </BrowserRouter>

    )
  }
}

export default App
